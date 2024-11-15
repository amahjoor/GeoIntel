interface SentimentAnalysis {
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

interface FiguresAndEvents {
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

interface ThreatAnalysis {
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
    // ... add other threat analysis interfaces as needed
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