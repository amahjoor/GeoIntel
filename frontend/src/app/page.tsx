'use client';
import { useState } from 'react';
import { analyzeCountry } from '@/services/api';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AnalysisCard } from '@/components/AnalysisCard';
import { CountrySelector } from '@/components/CountrySelector';

type AnalysisTab = 'sentiment' | 'figures' | 'threats';

export default function Home() {
  const [country, setCountry] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<AnalysisTab>('sentiment');

  const handleAnalyze = async () => {
    if (!country.trim()) {
      return;
    }

    try {
      setError('');
      setLoading(true);
      const result = await analyzeCountry(country);
      setAnalysis(result);
    } catch (error) {
      setError('Failed to analyze country. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAnalyze();
    }
  };

  const tabs = [
    { id: 'sentiment', label: 'Sentiment Analysis' },
    { id: 'figures', label: 'Key Figures & Events' },
    { id: 'threats', label: 'Threat Analysis' },
  ];

  const renderAnalysisContent = () => {
    if (!analysis) return null;
    
    switch (activeTab) {
      case 'sentiment':
        return <AnalysisCard title="Sentiment Analysis" data={analysis.sentiment} />;
      case 'figures':
        return <AnalysisCard title="Key Figures & Events" data={analysis.figures_events} />;
      case 'threats':
        return <AnalysisCard title="Threat Analysis" data={analysis.threats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Geo-Intelligence Hub
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex gap-4">
              <CountrySelector
                value={country}
                onChange={setCountry}
                onSelect={handleAnalyze}
                disabled={loading}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
          </div>

          {loading && (
            <div className="my-12">
              <LoadingSpinner />
              <p className="text-center mt-4 text-gray-600">
                Analyzing {country}... This may take a few moments.
              </p>
            </div>
          )}

          {analysis && !loading && (
            <>
              <div className="flex border-b border-gray-200 mb-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as AnalysisTab)}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {renderAnalysisContent()}
            </>
          )}
        </div>
      </main>
    </div>
  );
}