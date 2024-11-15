import { ThreatAnalysis } from '../services/api';

interface Props {
  data: ThreatAnalysis;
}

export const ThreatAnalysisCard = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Threat Analysis</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Threat Actors</h3>
        <div className="grid gap-6">
          {data.threat_actors.map((actor, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{actor.name}</h4>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    actor.threat_level === 'Critical' ? 'bg-red-100 text-red-800' :
                    actor.threat_level === 'High' ? 'bg-orange-100 text-orange-800' :
                    actor.threat_level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {actor.threat_level}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {actor.type}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-2">Capabilities</h5>
                  <ul className="list-disc pl-5 text-sm">
                    {actor.capabilities.map((cap, capIndex) => (
                      <li key={capIndex}>{cap}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Resources</h5>
                  <ul className="list-disc pl-5 text-sm">
                    {actor.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h5 className="font-medium mb-2">Known Activities</h5>
                <div className="space-y-3">
                  {actor.known_activities.map((activity, activityIndex) => (
                    <div key={activityIndex} className="border-l-4 border-red-500 pl-3">
                      <div className="text-sm text-gray-500">{activity.date}</div>
                      <div className="font-medium">{activity.activity}</div>
                      <div className="text-sm">Target: {activity.target}</div>
                      <div className="text-sm text-gray-600">{activity.impact}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add sections for active_threats, historical_incidents, vulnerabilities, and risk_assessment */}
    </div>
  );
};