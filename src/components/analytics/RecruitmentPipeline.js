export default function RecruitmentPipeline() {
    const pipelineData = [
      { stage: 'Sourced', count: 155, color: 'bg-blue-500' },
      { stage: 'Contacted', count: 65, color: 'bg-green-500' },
      { stage: 'Interviewed', count: 42, color: 'bg-purple-500' },
      { stage: 'Shortlisted', count: 27, color: 'bg-yellow-500' },
      { stage: 'Hired', count: 12, color: 'bg-red-500' }
    ];
    
    const maxHeight = 64; // rem units
    const maxCount = Math.max(...pipelineData.map(item => item.count));
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recruitment Pipeline</h2>
        <div className="flex items-end h-64 space-x-12 justify-between">
          {pipelineData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-24 ${item.color} rounded-t-lg`} 
                style={{ height: `${(item.count / maxCount) * maxHeight}rem` }}
              ></div>
              <span className="mt-2 text-sm font-medium text-gray-600">{item.stage}</span>
              <span className="text-lg font-semibold text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }