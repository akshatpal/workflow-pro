interface Props {
  title: string;

  value: number;

  color: string;
}

export default function DashboardCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <p className="text-slate-500">
        {title}
      </p>

      <h2
        className={`mt-4 text-4xl font-bold ${color}`}
      >
        {value}
      </h2>
    </div>
  );
}