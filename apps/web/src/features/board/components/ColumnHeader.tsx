interface Props {
  title: string;
  count: number;
  dragListeners?: any;
  dragAttributes?: any;
}

export default function ColumnHeader({
  title,
  count,
  dragListeners,
  dragAttributes,
}: Props) {
  return (
    <div
      className="mb-5 flex cursor-grab items-center justify-between active:cursor-grabbing"
      {...dragListeners}
      {...dragAttributes}
    >
      <h2 className="font-semibold">
        {title}
      </h2>

      <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
        {count}
      </span>
    </div>
  );
}