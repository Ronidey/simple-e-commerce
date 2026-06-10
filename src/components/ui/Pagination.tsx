import clsx from "../../lib/clsx";

type Props = {
  limit: number;
  currentPage: number;
  total: number;
  onNavigate: (val: number) => void;
};

export default function Pagination({
  currentPage,
  limit,
  total,
  onNavigate,
}: Props) {
  const totalPages = Math.ceil(total / limit);
  const pages = getPagination(currentPage, totalPages);

  return (
    <div className="flex flex-wrap gap-x-1 gap-y-4">
      <button
        disabled={currentPage <= 1}
        className="shrink-0 shadow-sm border border-gray-200 px-3 text-center rounded text-gray-500 text-sm disabled:bg-gray-100"
        onClick={() => onNavigate(Math.min(currentPage - 1))}
      >
        &#8592; Prev
      </button>
      {pages.map((pageCount, idx) => (
        <button
          key={idx}
          className={clsx(
            "shrink-0 shadow-sm border border-gray-200 w-8 h-8 text-center rounded",
            currentPage === pageCount
              ? "bg-blue-400 text-white"
              : "bg-white text-gray-500 disabled:bg-gray-100",
          )}
          disabled={pageCount === "..." || currentPage === pageCount}
          onClick={
            typeof pageCount === "number"
              ? () => onNavigate(pageCount)
              : undefined
          }
        >
          {pageCount}
        </button>
      ))}

      <button
        disabled={currentPage >= totalPages}
        className="shrink-0 shadow-sm border border-gray-200 px-3 text-center rounded text-gray-500 text-sm disabled:bg-gray-100"
        onClick={() => onNavigate(Math.max(currentPage + 1))}
      >
        Next &#8594;
      </button>
    </div>
  );
}

function getPagination(
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
) {
  const pages = [];

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  // Page 1 should always be visible
  pages.push(1);

  // Left dot
  if (leftSibling > 2) pages.push("...");

  // Middle pages logic
  for (
    let page = Math.max(2, leftSibling);
    page <= Math.min(totalPages - 1, rightSibling);
    page++
  ) {
    pages.push(page);
  }

  // Right dot
  if (rightSibling < totalPages - 1) {
    pages.push("...");
  }

  // Last page should always be visible too
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
