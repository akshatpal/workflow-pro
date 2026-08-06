interface Props {
  page: number;

  totalPages: number;

  onChange: (
    page: number
  ) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: Props) {
  if (totalPages <= 1)
    return null;

  return (
    <div className="flex justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() =>
          onChange(page - 1)
        }
        className="rounded-lg border px-4 py-2"
      >
        Previous
      </button>

      <span className="px-3 py-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          onChange(page + 1)
        }
        className="rounded-lg border px-4 py-2"
      >
        Next
      </button>
    </div>
  );
}