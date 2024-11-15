from pydantic import BaseModel
from typing import List, Dict, Optional

class SentimentAnalysis(BaseModel):
    overall_sentiment: str
    sentiment_score: float
    key_factors: List[str]
    analysis: str
    significant_events: List[Dict]
    sources: List[Dict]

class FiguresAndEvents(BaseModel):
    political_figures: List[Dict]
    recent_events: List[Dict]

class ThreatAnalysisResponse(BaseModel):
    threat_actors: List[Dict]
    active_threats: List[Dict]
    historical_incidents: List[Dict]
    vulnerabilities: List[Dict]
    risk_assessment: Dict