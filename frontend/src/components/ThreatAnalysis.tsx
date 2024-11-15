import { ThreatAnalysis } from '../services/api';

interface Props {
  data: ThreatAnalysis;
}

export const ThreatAnalysisCard = ({ data }: Props) => {
  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Threat Analysis</h2>

      {/* Threat Actors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Threat Actors</h3>
        <div className="grid gap-6">
          {data.threat_actors.map((actor, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{actor.name}</h4>
                  <div className="flex gap-2 mt-1">
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">{actor.type}</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">{actor.classification}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded ${getThreatLevelColor(actor.threat_level)}`}>
                  {actor.threat_level}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium mb-2">Capabilities</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {actor.capabilities.map((cap, idx) => (
                      <li key={idx}>{cap}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Resources</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {actor.resources.map((resource, idx) => (
                      <li key={idx}>{resource}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Known Activities</h5>
                <div className="space-y-3">
                  {actor.known_activities.map((activity, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-3 py-2">
                      <div className="text-sm text-gray-600">{activity.date}</div>
                      <div className="font-medium">{activity.activity}</div>
                      <div className="text-sm mt-1">
                        <span className="font-medium">Target:</span> {activity.target}
                      </div>
                      <div className="text-sm text-gray-700">{activity.impact}</div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {activity.methods_used.map((method, methodIdx) => (
                          <span key={methodIdx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Threats Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Active Threats</h3>
        <div className="grid gap-4">
          {data.active_threats.map((threat: ThreatAnalysis['active_threats'][0], index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">{threat.category}</span>
                <span className={`px-2 py-1 rounded text-sm ${getThreatLevelColor(threat.severity)}`}>
                  {threat.severity}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{threat.likelihood}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{threat.timeframe}</span>
              </div>
              <p className="text-gray-800 mb-3">{threat.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Potential Impacts</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {threat.potential_impacts.map((impact, idx) => (
                      <li key={idx}>{impact}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Indicators</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {threat.indicators.map((indicator, idx) => (
                      <li key={idx}>{indicator}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Incidents Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Historical Incidents</h3>
        <div className="space-y-6">
          {data.historical_incidents.map((incident: ThreatAnalysis['historical_incidents'][0], index: number) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-gray-600">{incident.date}</div>
                  <div className="font-semibold">{incident.type}</div>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  incident.success_level === 'Successful' ? 'bg-red-100 text-red-800' :
                  incident.success_level === 'Partial' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {incident.success_level}
                </span>
              </div>
              
              <p className="text-gray-800 mb-3">{incident.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Impact</h5>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="font-medium">Immediate:</span> {incident.impact.immediate}
                    </div>
                    <div>
                      <span className="font-medium">Long Term:</span> {incident.impact.long_term}
                    </div>
                    <div>
                      <span className="font-medium">Affected Sectors:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {incident.impact.affected_sectors.map((sector: string, idx: number) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Response</h5>
                  <div className="text-sm">
                    <div className="mb-2">
                      <span className="font-medium">Measures Taken:</span>
                      <ul className="list-disc pl-5 mt-1">
                        {incident.response.measures_taken.map((measure: string, idx: number) => (
                          <li key={idx}>{measure}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-medium">Effectiveness:</span> {incident.response.effectiveness}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Risk Assessment</h3>
        <div className="border rounded-lg p-4">
          <div className="flex gap-4 mb-4">
            <div>
              <span className="font-medium">Overall Threat Level:</span>
              <span className={`ml-2 px-3 py-1 rounded ${getThreatLevelColor(data.risk_assessment.overall_threat_level)}`}>
                {data.risk_assessment.overall_threat_level}
              </span>
            </div>
            <div>
              <span className="font-medium">Trend:</span>
              <span className={`ml-2 px-3 py-1 rounded ${
                data.risk_assessment.trend === 'Increasing' ? 'bg-red-100 text-red-800' :
                data.risk_assessment.trend === 'Decreasing' ? 'bg-green-100 text-green-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {data.risk_assessment.trend}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Key Concerns</h4>
            <ul className="list-disc pl-5 space-y-1">
              {data.risk_assessment.key_concerns.map((concern, index) => (
                <li key={index}>{concern}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Recommendations</h4>
            <div className="space-y-3">
              {data.risk_assessment.recommendations.map((rec: ThreatAnalysis['risk_assessment']['recommendations'][0], index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-sm ${getThreatLevelColor(rec.priority)}`}>
                      {rec.priority}
                    </span>
                    <span className="text-sm text-gray-600">{rec.timeframe}</span>
                  </div>
                  <div className="font-medium">{rec.action}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rec.resources_required.map((resource, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};