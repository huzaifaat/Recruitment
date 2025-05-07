export default function ProgressBar({ value, max = 100, className = '', showLabel = true }) {
    const percentage = (value / max) * 100;
    
    const getColorClass = () => {
      if (percentage < 40) return 'bg-red-500';
      if (percentage < 70) return 'bg-yellow-500';
      return 'bg-green-500';
    };
    
    return (
      <div className={`w-full ${className}`}>
        <div className="flex justify-between mb-1">
          {showLabel && (
            <span className="text-xs font-medium text-gray-700">Match score</span>
          )}
          <span className="text-xs font-medium text-gray-700">{percentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`${getColorClass()} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }