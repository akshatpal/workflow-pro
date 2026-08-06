import {
  ChevronRight,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

interface Item {
  label: string;

  href?: string;
}

interface Props {
  items: Item[];
}

export default function Breadcrumb({
  items,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm">
      {items.map(
        (item, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            {item.href ? (
              <Link
                to={item.href}
                className="text-blue-600 hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium">
                {item.label}
              </span>
            )}

            {index !==
              items.length -
                1 && (
              <ChevronRight
                size={16}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}