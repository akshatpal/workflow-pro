export default function TaskCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-white p-4 shadow">
      <div className="h-5 w-40 rounded bg-slate-200" />

      <div className="mt-5 flex justify-between">
        <div className="h-5 w-20 rounded bg-slate-200" />

        <div className="h-5 w-16 rounded bg-slate-200" />
      </div>

      <div className="mt-5 h-8 w-28 rounded-full bg-slate-200" />
    </div>
  );
}