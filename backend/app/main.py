from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .services.country_analysis import (
    format_question, 
    format_poi_events_question, 
    ask_model
)
from .services.threat_analysis import get_threat_analysis_prompt

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_country(data: dict):
    country = data.get("country")
    home_country = "United States"
    
    # Get all analyses
    sentiment_question = format_question(country, home_country)
    sentiment_answer = ask_model(sentiment_question)
    
    poi_question = format_poi_events_question(country, home_country)
    poi_answer = ask_model(poi_question)
    
    threat_question = get_threat_analysis_prompt(country, home_country)
    threat_answer = ask_model(threat_question)
    
    return {
        "sentiment": sentiment_answer,
        "figures_events": poi_answer,
        "threats": threat_answer
    }