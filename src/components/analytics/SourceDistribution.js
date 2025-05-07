export default function SourceDistribution() {
    const sourceData = [
      { source: 'LinkedIn', percentage: 45, color: 'bg-blue-500' },
      { source: 'GitHub', percentage: 30, color: 'bg-green-500' },
      { source: 'Rozee.pk', percentage: 15, color: 'bg-purple-500' },
      { source: 'Codable', percentage: 10, color: 'bg-yellow-500' }
    ];
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Source Distribution</h2>
        <div className="flex justify-center items-center my-6">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
            <div className="absolute inset-3 rounded-full border-8 border-green-500"></div>
            <div className="absolute inset-6 rounded-full border-8 border-purple-500"></div>
            <div className="absolute inset-9 rounded-full bg-yellow-500"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {sourceData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="ml-2 text-sm text-gray-600">{item.source} ({item.percentage}%)</span>
            </div>
          ))}
        </div>
      </div>
    );
  }