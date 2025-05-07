export default function TimeToHire() {
    const timeData = [
      { role: 'Frontend', days: 15, color: 'bg-blue-500' },
      { role: 'Backend', days: 24, color: 'bg-blue-500' },
      { role: 'UI/UX', days: 18, color: 'bg-blue-500' },
      { role: 'DevOps', days: 35, color: 'bg-blue-500' },
      { role: 'PM', days: 12, color: 'bg-blue-500' }
    ];
    
    const maxDays = Math.max(...timeData.map(item => item.days));
    const maxHeight = 48; // rem units
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Time-to-Hire (Days)</h2>
        <div className="flex items-end space-x-6 h-48 justify-center">
          {timeData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-12 ${item.color} rounded-t`}
                style={{ height: `${(item.days / maxDays) * maxHeight}rem` }}
              ></div>
              <span className="mt-2 text-xs text-gray-600">{item.role}</span>
              <span className="text-sm font-medium text-gray-900">{item.days}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Average: {Math.round(timeData.reduce((sum, item) => sum + item.days, 0) / timeData.length)} days
          </p>
        </div>
      </div>
    );
  }