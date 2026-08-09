interface Props {
  message?: string;
}

export default function ErrorState({
  message,
}: Props) {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 py-12 text-center">
      <h2 className="text-lg font-semibold text-red-600">
        Something went wrong
      </h2>

      <p className="mt-3 text-red-500">
        {message ??
          "Please try again."}
      </p>
    </div>
  );
}