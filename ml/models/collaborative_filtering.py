from sklearn.neighbors import NearestNeighbors
import pandas as pd
import numpy as np

def train_collaborative_filtering_model(ratings_df):
    user_item_matrix = ratings_df.pivot(index='userId', columns='movieId', values='rating').fillna(0)
    model = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
    model.fit(user_item_matrix)
    return model, user_item_matrix

def get_user_recommendations(user_id, model, user_item_matrix):
    user_vector = user_item_matrix.loc[user_id].values.reshape(1, -1)
    distances, indices = model.kneighbors(user_vector, n_neighbors=20)
    
    similar_users = indices.flatten()[1:]
    user_ratings = user_item_matrix.loc[user_id]
    similar_users_ratings = user_item_matrix.iloc[similar_users]
    
    mean_ratings = np.mean(similar_users_ratings, axis=0)
    recommended_indices = np.argsort(mean_ratings)[::-1]
    
    # Filter out movies the user has already rated
    recommended_indices = [idx for idx in recommended_indices if user_ratings.iloc[idx] == 0]
    
    return user_item_matrix.columns[recommended_indices[:10]].tolist()