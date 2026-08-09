interface Props {
  priority: string;
}

const styles = {
  LOW: "bg-green-100 text-green-700",

  MEDIUM:
    "bg-yellow-100 text-yellow-700",

  HIGH: "bg-orange-100 text-orange-700",

  CRITICAL:
    "bg-red-100 text-red-700",
};

export default function PriorityBadge({
  priority,
}: Props) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        styles[
          priority as keyof typeof styles
        ]
      }`}
    >
      {priority}
    </span>
  );
}