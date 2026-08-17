interface Props {
  count: number;
}

export default function NotificationBadge({
  count,
}: Props) {
  if (count === 0) return null;

  return (
    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
      {count > 99
        ? "99+"
        : count}
    </span>
  );
}