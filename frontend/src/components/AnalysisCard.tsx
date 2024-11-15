import { SentimentAnalysisCard } from './SentimentAnalysis';
import { FiguresEventsCard } from './FiguresEvents';
import { ThreatAnalysisCard } from './ThreatAnalysis';

interface AnalysisCardProps {
  title: string;
  data: any;
}

export const AnalysisCard = ({ title, data }: AnalysisCardProps) => {
  switch (title) {
    case 'Sentiment Analysis':
      return <SentimentAnalysisCard data={data} />;
    case 'Key Figures & Events':
      return <FiguresEventsCard data={data} />;
    case 'Threat Analysis':
      return <ThreatAnalysisCard data={data} />;
    default:
      return null;
  }
};