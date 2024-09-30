from fastapi import FastAPI, HTTPException
import joblib
import pandas as pd
from models.content_based import get_similar_movies
from models.collaborative_filtering import get_user_recommendations

app = FastAPI()

# Load pre-trained models
content_based_model = joblib.load('ml/models/content_based_model.joblib')
cf_model, user_item_matrix = joblib.load('ml/models/collaborative_filtering_model.joblib')
movies_df = pd.read_pickle('ml/data/movies_df.pkl')

@app.get("/api/movies/{movie_id}/similar")
async def similar_movies(movie_id: int):
    try:
        recommendations = get_similar_movies(movie_id, content_based_model, movies_df)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/api/users/{user_id}/recommendations")
async def user_recommendations(user_id: int):
    try:
        recommendations = get_user_recommendations(user_id, cf_model, user_item_matrix)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)