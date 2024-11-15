import { SentimentAnalysis } from '../services/api';

interface Props {
  data: SentimentAnalysis;
}

export const SentimentAnalysisCard = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Sentiment Analysis</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">Overall Sentiment:</span>
          <span className={`px-3 py-1 rounded ${
            data.overall_sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
            data.overall_sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {data.overall_sentiment}
          </span>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Sentiment Score:</span> {data.sentiment_score}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Key Factors</h3>
        <ul className="list-disc pl-5">
          {data.key_factors.map((factor, index) => (
            <li key={index}>{factor}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Analysis</h3>
        <p className="text-black">{data.analysis}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Significant Events</h3>
        <div className="space-y-4">
          {data.significant_events.map((event, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <div className="font-semibold">{event.date}</div>
              <div>{event.event}</div>
              <div className="text-black text-sm">{event.impact}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sources</h3>
        <div className="space-y-2">
          {data.sources.map((source, index) => (
            <div key={index} className="text-sm">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {source.description}
              </a>
              <div className="text-black">{source.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};