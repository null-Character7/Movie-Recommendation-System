from preprocessing import preprocess_data
from models.content_based import train_content_based_model
from models.collaborative_filtering import train_collaborative_filtering_model
import joblib

def train_models():
    movies_df, ratings_df = preprocess_data()
    
    # Train content-based model
    content_based_model = train_content_based_model(movies_df)
    joblib.dump(content_based_model, 'ml/models/content_based_model.joblib')
    
    # Train collaborative filtering model
    cf_model, user_item_matrix = train_collaborative_filtering_model(ratings_df)
    joblib.dump((cf_model, user_item_matrix), 'ml/models/collaborative_filtering_model.joblib')
    
    # Save movies_df for later use
    movies_df.to_pickle('ml/data/movies_df.pkl')

if __name__ == "__main__":
    train_models()