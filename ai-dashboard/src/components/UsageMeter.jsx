export default function UsageMeter({ used, limit }) {
  const percent = (used / limit) * 100;

  return (
    <div className="w-52">
      <div className="text-xs text-gray-400 mb-1">
        {used} / {limit} requests
      </div>
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-accent h-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}