import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "your_database_url_here"

def preprocess_data():
    engine = create_engine(DATABASE_URL)
    
    query = """
        SELECT m.id, m.title, m.genre, m."releaseYear", 
               AVG(r.rating) as avg_rating,
               CONCAT(m.genre, ' ', m.description, ' ', m.cast) as features
        FROM "Movie" m
        LEFT JOIN "Rating" r ON m.id = r."movieId"
        GROUP BY m.id
    """
    
    movies_df = pd.read_sql(query, engine)
    ratings_df = pd.read_sql("SELECT * FROM \"Rating\"", engine)
    
    return movies_df, ratings_df

# If you need to save preprocessed data
def save_preprocessed_data(movies_df, ratings_df):
    movies_df.to_csv('ml/data/preprocessed_movies.csv', index=False)
    ratings_df.to_csv('ml/data/preprocessed_ratings.csv', index=False)

if __name__ == "__main__":
    movies_df, ratings_df = preprocess_data()
    save_preprocessed_data(movies_df, ratings_df)