import pandas as pd
from sqlalchemy import create_engine
import os


DATABASE_URL = "postgresql://default:rCqnz5T0yuNO@ep-purple-cherry-a1oxdqa6-pooler.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require"

def preprocess_data():
    engine = create_engine(DATABASE_URL)
    
    query = """
        SELECT m.ttid, m.title, m.genre, m."releaseYear", 
               AVG(r.rating) as avg_rating,
               CONCAT(m.genre, ' ', m.description, ' ', m.cast) as features
        FROM "Movie" m
        LEFT JOIN "Rating" r ON m.ttid = r."movieId"
        GROUP BY m.ttid
    """
    
    movies_df = pd.read_sql(query, engine)
    ratings_df = pd.read_sql("SELECT * FROM \"Rating\"", engine)
    
    return movies_df, ratings_df

# If you need to save preprocessed data
def save_preprocessed_data(movies_df, ratings_df):
    output_dir = os.path.join('ml', 'data')
    os.makedirs(output_dir, exist_ok=True)
    
    movies_df.to_csv(os.path.join(output_dir, 'preprocessed_movies.csv'), index=False)
    ratings_df.to_csv(os.path.join(output_dir, 'preprocessed_ratings.csv'), index=False)

if __name__ == "__main__":
    movies_df, ratings_df = preprocess_data()
    save_preprocessed_data(movies_df, ratings_df)