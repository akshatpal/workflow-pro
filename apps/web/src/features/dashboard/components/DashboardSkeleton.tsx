export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-4 gap-6">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-xl bg-slate-200"
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="h-96 rounded-xl bg-slate-200"
          />
        ))}
      </div>
    </div>
  );
}