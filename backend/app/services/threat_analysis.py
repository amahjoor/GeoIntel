def get_threat_analysis_prompt(country, home_country):
    return f"""Analyze potential threats from {country} against {home_country}. Provide your response in a valid JSON format following this exact structure. Include only factual, verifiable information.

Return a single JSON object with no additional text or explanation. The JSON MUST follow this format:

{{
    "threat_actors": [
        {{
            "name": "Name of group/organization",
            "type": "State/Non-State/Criminal/Terrorist/Hacktivist",
            "classification": "Internal/External",
            "threat_level": "Critical/High/Medium/Low",
            "capabilities": ["capability1", "capability2"],
            "resources": ["resource1", "resource2"],
            "known_activities": [
                {{
                    "date": "YYYY-MM-DD",
                    "activity": "Specific activity description",
                    "target": "Specific target",
                    "impact": "Specific impact",
                    "methods_used": ["method1", "method2"]
                }}
            ],
            "associates": [
                {{
                    "name": "Associate name",
                    "relationship": "Specific relationship",
                    "significance": "Why significant"
                }}
            ]
        }}
    ],
    "active_threats": [
        {{
            "category": "Cyber/Physical/Social/Economic/Political",
            "severity": "Critical/High/Medium/Low",
            "likelihood": "Very Likely/Likely/Possible/Unlikely",
            "timeframe": "Immediate/Short-term/Long-term",
            "description": "Specific threat description",
            "potential_impacts": ["impact1", "impact2"],
            "indicators": ["indicator1", "indicator2"],
            "related_actors": ["actor1", "actor2"]
        }}
    ],
    "historical_incidents": [
        {{
            "date": "YYYY-MM-DD",
            "type": "Incident type",
            "description": "Specific description",
            "actors_involved": ["actor1", "actor2"],
            "target": "Specific target",
            "success_level": "Successful/Partial/Failed",
            "impact": {{
                "immediate": "Immediate impact",
                "long_term": "Long-term impact",
                "affected_sectors": ["sector1", "sector2"]
            }},
            "response": {{
                "measures_taken": ["measure1", "measure2"],
                "effectiveness": "High/Medium/Low"
            }},
            "lessons_learned": ["lesson1", "lesson2"]
        }}
    ],
    "vulnerabilities": [
        {{
            "type": "Technical/Physical/Human/Process",
            "description": "Specific description",
            "severity": "Critical/High/Medium/Low",
            "exploitation_likelihood": "High/Medium/Low",
            "affected_systems": ["system1", "system2"],
            "potential_impacts": ["impact1", "impact2"],
            "mitigation_status": "Not Started/In Progress/Completed",
            "recommended_actions": [
                {{
                    "action": "Specific action",
                    "priority": "High/Medium/Low",
                    "resource_requirement": "Required resources",
                    "estimated_timeline": "Timeline"
                }}
            ]
        }}
    ],
    "risk_assessment": {{
        "overall_threat_level": "Critical/High/Medium/Low",
        "trend": "Increasing/Stable/Decreasing",
        "key_concerns": ["concern1", "concern2"],
        "recommendations": [
            {{
                "priority": "High/Medium/Low",
                "action": "Specific action",
                "timeframe": "Immediate/Short-term/Long-term",
                "resources_required": ["resource1", "resource2"]
            }}
        ]
    }}
}}

Include at least 3 threat actors, 3 active threats, 3 historical incidents, and 2 vulnerabilities. Ensure all dates, names, and details are specific and accurate.""" 