import { FiguresAndEvents } from '../services/api';

interface Props {
  data: FiguresAndEvents;
}

export const FiguresEventsCard = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Key Figures & Events</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Political Figures</h3>
        <div className="grid gap-6">
          {data.political_figures.map((figure, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-lg">{figure.name}</h4>
                  <p className="text-gray-600">{figure.position}</p>
                </div>
                {figure.party && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {figure.party}
                  </span>
                )}
              </div>
              <p className="text-gray-700 mb-3">{figure.significance}</p>
              
              <div className="space-y-2">
                {figure.key_events.map((event, eventIndex) => (
                  <div key={eventIndex} className="border-l-4 border-blue-500 pl-3">
                    <div className="text-sm text-gray-500">{event.date}</div>
                    <div className="font-medium">{event.event}</div>
                    <div className="text-sm text-gray-600">{event.impact}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Events</h3>
        <div className="space-y-4">
          {data.recent_events.map((event, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-600">{event.date}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                  {event.category}
                </span>
              </div>
              <h4 className="font-medium mb-2">{event.event}</h4>
              <p className="text-gray-700 mb-2">{event.impact}</p>
              <div className="flex flex-wrap gap-2">
                {event.key_figures_involved.map((figure, figureIndex) => (
                  <span key={figureIndex} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
                    {figure}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};