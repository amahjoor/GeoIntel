import requests
from .threat_analysis import get_threat_analysis_prompt
from fastapi import HTTPException
import json

home_country = "United States"

def format_question(country,home_country):
    return f"""Analyze the current sentiment of {country} towards the {home_country}. 
    Please provide a detailed analysis with 6 specific sources giving URLS (news articles, polls, or diplomatic statements) 
    from the last year. Format the response as a json with this exact structure:
    
    {{
        "overall_sentiment": "Positive/Neutral/Negative",
        "sentiment_score": 0,
        "key_factors": [
            "factor1",
            "factor2",
            "factor3"
        ],
        "analysis": "Detailed analysis text here",
        "significant_events": [
            {{
                "date": "YYYY-MM-DD",
                "event": "Event description",
                "impact": "Impact or significance"
            }},
            // ... more events ...
        ],
        "sources": [
            {{
                "date": "YYYY-MM-DD",
                "url": "https://example.com",
                "description": "Brief description of source"
            }},
            // ... more sources ...
        ]
    }}"""

def format_poi_events_question(country, home_country):
    return f"""For {country}, provide a current analysis of key figures and events. 
    Format the response as a json with this exact structure, including political figures and people significant to {home_country}:
    
    {{
        "political_figures": [
            {{
                "name": "Full Name of Political Figure 1",
                "position": "Current Official Position",
                "party": "Political Party",
                "significance": "Brief description of their role and importance",
                "key_events": [
                    {{
                        "date": "YYYY-MM-DD",
                        "event": "Description of significant event",
                        "impact": "Impact on their influence or country"
                    }}
                ]
            }},
            {{
                "name": "Full Name of Political Figure 2",
                "position": "Current Official Position",
                "party": "Political Party",
                "significance": "Brief description of their role and importance",
                "key_events": [
                    {{
                        "date": "YYYY-MM-DD",
                        "event": "Description of significant event",
                        "impact": "Impact on their influence or country"
                    }}
                ]
            }},
            // ... 3 more important figures ...
        ],
        ],
        "recent_events": [
            {{
                "date": "YYYY-MM-DD",
                "event": "Event description",
                "category": "Political/Economic/Social/Other",
                "impact": "Impact or significance",
                "key_figures_involved": ["Name 1", "Name 2"]
            }},
            // ... include exactly 5 recent events ...
        ]
    }}"""

def ask_model(question, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = requests.post(
                "https://hackathon.niprgpt.mil/llama/v1/chat/completions",
                headers={
                    "Authorization": "Bearer Y2VudGNvbTpsZXRtZWlu",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "neuralmagic/Meta-Llama-3.1-70B-Instruct-FP8",
                    "messages": [
                        {"role": "system", "content": "You must return only valid JSON with no additional text or formatting."},
                        {"role": "user", "content": question}
                    ],
                    "temperature": 0.7
                },
                timeout=30
            )
            
            result = response.json()
            if "choices" in result and len(result["choices"]) > 0:
                return result["choices"][0]["message"]["content"]
            
        except (requests.RequestException, json.JSONDecodeError) as e:
            if attempt == max_retries - 1:
                raise HTTPException(status_code=500, detail=f"Failed to get valid response after {max_retries} attempts")
            continue
            
    return "Error: Unable to get response from model"

# Example usage
if __name__ == "__main__":
    while True:
        country = input("Enter a country name (or 'quit' to exit): ")
        if country.lower() == 'quit':
            break
        
        # Original sentiment analysis
        sentiment_question = format_question(country,home_country)
        print(f"\nAnalyzing {country}'s sentiment towards the United States...")
        sentiment_answer = ask_model(sentiment_question)
        print("\nSentiment Analysis:", sentiment_answer, "\n")
        
        # New POI and events analysis
        print(f"\nAnalyzing key figures and events in {country}...")
        poi_question = format_poi_events_question(country,home_country)
        poi_answer = ask_model(poi_question)
        print("\nKey Figures and Events Analysis:", poi_answer, "\n")

        terrorism_answer = ask_model(get_threat_analysis_prompt(country, home_country))
        print(terrorism_answer)