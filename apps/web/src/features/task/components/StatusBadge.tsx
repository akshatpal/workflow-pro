interface Props {
  status: string;
}

const styles = {
  TODO: "bg-slate-100 text-slate-700",

  IN_PROGRESS:
    "bg-blue-100 text-blue-700",

  IN_REVIEW:
    "bg-yellow-100 text-yellow-700",

  DONE: "bg-green-100 text-green-700",
};

export default function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        styles[
          status as keyof typeof styles
        ]
      }`}
    >
      {status.replaceAll(
        "_",
        " "
      )}
    </span>
  );
}