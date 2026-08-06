import { AlertTriangle } from "lucide-react";

interface Props {
  message?: string;
}

export default function ErrorState({
  message,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-16 text-center shadow">
      <AlertTriangle
        size={70}
        className="mx-auto text-red-500"
      />

      <h2 className="mt-6 text-2xl font-semibold">
        Something went wrong
      </h2>

      <p className="mt-3 text-slate-500">
        {message ??
          "Unable to load data."}
      </p>
    </div>
  );
}