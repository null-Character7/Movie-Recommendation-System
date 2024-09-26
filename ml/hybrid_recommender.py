import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
from collections import defaultdict
import psycopg2

app = Flask(__name__)

# Establish database connection
def get_db_connection():
    conn = psycopg2.connect(
        dbname="movie_db", user="db_user", password="db_pass", host="localhost")
    return conn

# Fetch movie features for content-based filtering
def fetch_movie_metadata():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT movie_id, genre, cast, director FROM movies;
    """)
    movies = cur.fetchall()
    cur.close()
    conn.close()
    
    return movies

# Fetch user ratings for collaborative filtering
def fetch_user_ratings(user_id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT movie_id, rating FROM ratings WHERE user_id = %s;
    """, (user_id,))
    user_ratings = dict(cur.fetchall())
    cur.close()
    conn.close()
    
    return user_ratings

# Content-based recommendation using KNN
def knn_recommendation(movie_id, k=5):
    movies = fetch_movie_metadata()
    movie_ids, movie_features = create_feature_matrix(movies)
    
    similarity_matrix = calculate_cosine_similarity(movie_features)
    movie_index = movie_ids.index(movie_id)
    similarity_scores = list(enumerate(similarity_matrix[movie_index]))
    
    similar_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:k+1]
    top_k_movies = [movie_ids[i[0]] for i in similar_movies]
    
    return top_k_movies

# Collaborative filtering recommendation
def collaborative_recommendation(user_id, k=5):
    user_ratings = fetch_user_ratings(user_id)
    similar_users = get_similar_users(user_id)  # Based on ratings similarity
    
    recommendations = get_recommendations_based_on_similar_users(similar_users, user_ratings)
    return recommendations

# Hybrid recommendation combining both KNN and Collaborative Filtering
def hybrid_recommendation(user_id, movie_id, k=5, alpha=0.5):
    # Get content-based recommendations
    content_based_movies = knn_recommendation(movie_id, k)
    
    # Get collaborative filtering recommendations
    collaborative_movies = collaborative_recommendation(user_id, k)
    
    # Combine the two lists, giving weights to each method
    recommendations = defaultdict(float)
    
    for movie in content_based_movies:
        recommendations[movie] += alpha  # Weight for content-based
    
    for movie in collaborative_movies:
        recommendations[movie] += (1 - alpha)  # Weight for collaborative
    
    # Sort movies by their weighted score
    final_recommendations = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    
    return [movie for movie, _ in final_recommendations[:k]]

@app.route('/hybrid-recommend', methods=['POST'])
def recommend_hybrid():
    user_id = request.json['user_id']
    movie_id = request.json['movie_id']
    
    recommendations = hybrid_recommendation(user_id, movie_id)
    return jsonify({'recommendations': recommendations})

if __name__ == '__main__':
    app.run(debug=True)
