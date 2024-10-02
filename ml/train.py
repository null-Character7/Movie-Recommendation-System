import os
import joblib
from preprocessing import preprocess_data
from models.content_based import train_content_based_model
from models.collaborative_filtering import train_collaborative_filtering_model

def train_models():
    # Create necessary directories if they don't exist
    os.makedirs('ml/models', exist_ok=True)
    os.makedirs('ml/data', exist_ok=True)

    # Preprocess the data
    try:
        movies_df, ratings_df = preprocess_data()
        print("Data preprocessing completed successfully.")
    except Exception as e:
        print(f"Error during data preprocessing: {e}")
        return

    # Train content-based model
    try:
        content_based_model = train_content_based_model(movies_df)
        joblib.dump(content_based_model, 'ml/models/content_based_model.joblib')
        print("Content-based model trained and saved successfully.")
    except Exception as e:
        print(f"Error during content-based model training: {e}")
        return

    # Train collaborative filtering model
    try:
        cf_model, user_item_matrix = train_collaborative_filtering_model(ratings_df)
        joblib.dump((cf_model, user_item_matrix), 'ml/models/collaborative_filtering_model.joblib')
        print("Collaborative filtering model trained and saved successfully.")
    except Exception as e:
        print(f"Error during collaborative filtering model training: {e}")
        return

    # Save movies_df for later use
    try:
        movies_df.to_pickle('ml/data/movies_df.pkl')
        print("Movies data saved successfully.")
    except Exception as e:
        print(f"Error saving movies data: {e}")

if __name__ == "__main__":
    train_models()
