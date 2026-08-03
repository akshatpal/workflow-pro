import type {
    ButtonHTMLAttributes,
} from "react";
import clsx from "clsx";

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({
  loading,

  className,

  children,

  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={
        loading || props.disabled
      }
      className={clsx(
        "w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {loading
        ? "Loading..."
        : children}
    </button>
  );
}