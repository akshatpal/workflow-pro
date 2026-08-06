interface Props {
  search: string;

  setSearch: (value: string) => void;

  status: string;

  setStatus: (value: string) => void;

  visibility: string;

  setVisibility: (value: string) => void;
}

export default function ProjectFilters({
  search,
  setSearch,
  status,
  setStatus,
  visibility,
  setVisibility,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search project..."
        className="w-72 rounded-lg border p-3"
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          All Status
        </option>

        <option value="ACTIVE">
          Active
        </option>

        <option value="ARCHIVED">
          Archived
        </option>
      </select>

      <select
        value={visibility}
        onChange={(e) =>
          setVisibility(
            e.target.value
          )
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          All Visibility
        </option>

        <option value="PRIVATE">
          Private
        </option>

        <option value="PUBLIC">
          Public
        </option>
      </select>
    </div>
  );
}