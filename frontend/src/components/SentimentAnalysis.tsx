import { SentimentAnalysis } from '../services/api';

interface Props {
  data: SentimentAnalysis;
}

export const SentimentAnalysisCard = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Sentiment Analysis</h2>
      
      {/* Overall Sentiment Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-lg">Overall Sentiment:</span>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
            data.overall_sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
            data.overall_sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {data.overall_sentiment}
          </span>
        </div>
        
        <div className="space-y-3">
          <div>
            <span className="font-medium text-gray-700">Sentiment Score: </span>
            <span className="text-lg font-semibold">{data.sentiment_score.toFixed(2)}</span>
          </div>
          <SentimentMeter score={data.sentiment_score} />
        </div>
      </div>

      {/* Key Factors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Key Factors</h3>
        <ul className="list-disc pl-5 space-y-2">
          {data.key_factors.map((factor, index) => (
            <li key={index} className="text-gray-800">{factor}</li>
          ))}
        </ul>
      </div>

      {/* Analysis Section */}
      <div className="mb-8 bg-gray-50 rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">Analysis</h3>
        <p className="text-gray-800 leading-relaxed">{data.analysis}</p>
      </div>

      {/* Significant Events Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Significant Events</h3>
        <div className="space-y-4">
          {data.significant_events.map((event, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
              <div className="font-semibold text-gray-900">{event.date}</div>
              <div className="text-gray-800 my-1">{event.event}</div>
              <div className="text-gray-700 text-sm">{event.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Sources</h3>
        <div className="space-y-3 bg-gray-50 rounded-lg p-4">
          {data.sources.map((source, index) => (
            <div key={index} className="flex justify-between items-center">
              <a 
                href={source.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {source.description}
              </a>
              <div className="text-gray-600 text-sm">{source.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SentimentMeter = ({ score }: { score: number }) => {
  // Convert score from -1:1 range to 0:100 for percentage
  const percentage = ((score + 1) / 2) * 100;
  
  // Determine color based on score
  const getColor = (score: number) => {
    if (score < -0.33) return 'bg-red-500';
    if (score < 0.33) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2">
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor(score)} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1 text-gray-600">
        <span>-1</span>
        <span>0</span>
        <span>1</span>
      </div>
    </div>
  );
};