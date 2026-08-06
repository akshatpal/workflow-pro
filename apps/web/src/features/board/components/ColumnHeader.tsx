interface Props {
  title: string;

  count: number;
}

export default function ColumnHeader({
  title,
  count,
}: Props) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="font-semibold">
        {title}
      </h2>

      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
        {count}
      </span>
    </div>
  );
}