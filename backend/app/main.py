from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from app.schemas import SentimentAnalysis, FiguresAndEvents, ThreatAnalysisResponse
from app.services.country_analysis import format_question, format_poi_events_question, ask_model
from app.services.threat_analysis import get_threat_analysis_prompt

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_json_response(response: str, schema_class=None) -> dict:
    try:
        # Clean the response
        cleaned = response.strip()
        if cleaned.startswith('```') and cleaned.endswith('```'):
            # Extract JSON content from code blocks
            start_idx = cleaned.find('{')
            end_idx = cleaned.rfind('}') + 1
            if start_idx != -1 and end_idx != -1:
                cleaned = cleaned[start_idx:end_idx]
        
        # Parse JSON
        parsed = json.loads(cleaned)
        
        # Validate against schema if provided
        if schema_class:
            validated = schema_class(**parsed)
            return validated.dict()
        
        return parsed
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse JSON response: {str(e)}")
    except ValueError as e:
        raise HTTPException(status_code=500, detail=f"Failed to validate response format: {str(e)}")

@app.post("/analyze")
async def analyze_country(data: dict):
    country = data.get("country")
    home_country = "United States"
    
    # Get and parse all analyses
    sentiment_answer = parse_json_response(ask_model(format_question(country, home_country)), SentimentAnalysis)
    poi_answer = parse_json_response(ask_model(format_poi_events_question(country, home_country)), FiguresAndEvents)
    threat_answer = parse_json_response(ask_model(get_threat_analysis_prompt(country, home_country)), ThreatAnalysisResponse)
    
    return {
        "sentiment": sentiment_answer,
        "figures_events": poi_answer,
        "threats": threat_answer
    }