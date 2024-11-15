export interface SentimentAnalysis {
    overall_sentiment: "Positive" | "Neutral" | "Negative";
    sentiment_score: number;
    key_factors: string[];
    analysis: string;
    significant_events: Array<{
        date: string;
        event: string;
        impact: string;
    }>;
    sources: Array<{
        date: string;
        url: string;
        description: string;
    }>;
}

export interface FiguresAndEvents {
    political_figures: Array<{
        name: string;
        position: string;
        party?: string;
        significance: string;
        key_events: Array<{
            date: string;
            event: string;
            impact: string;
        }>;
    }>;
    recent_events: Array<{
        date: string;
        event: string;
        category: string;
        impact: string;
        key_figures_involved: string[];
    }>;
}

export interface ThreatAnalysis {
    threat_actors: Array<{
        name: string;
        type: string;
        classification: string;
        threat_level: string;
        capabilities: string[];
        resources: string[];
        known_activities: Array<{
            date: string;
            activity: string;
            target: string;
            impact: string;
            methods_used: string[];
        }>;
    }>;
    active_threats: Array<{
        type: string;
        description: string;
        category: string;
        severity: string;
        likelihood: string;
        timeframe: string;
        exploitation_likelihood: string;
        affected_systems: string[];
        potential_impacts: string[];
        mitigation_status: string;
        indicators: string[];
        recommended_actions: Array<{
            action: string;
            priority: string;
            resource_requirement: string;
            estimated_timeline: string;
        }>;
    }>;
    historical_incidents: Array<{
        date: string;
        type: string;
        description: string;
        actors_involved: string[];
        target: string;
        success_level: string;
        impact: {
            immediate: string;
            long_term: string;
            affected_sectors: string[];
        };
        response: {
            measures_taken: string[];
            effectiveness: string;
        };
        lessons_learned: string[];
    }>;
    risk_assessment: {
        overall_threat_level: string;
        trend: string;
        key_concerns: string[];
        recommendations: Array<{
            priority: string;
            action: string;
            timeframe: string;
            resources_required: string[];
        }>;
    };
}

interface AnalysisResponse {
    sentiment: SentimentAnalysis;
    figures_events: FiguresAndEvents;
    threats: ThreatAnalysis;
}

export const analyzeCountry = async (country: string): Promise<AnalysisResponse> => {
    const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};