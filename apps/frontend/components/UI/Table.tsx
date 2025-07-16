import Skeleton from "./Skeleton";

export default function Table({
  head,
  body,
  isLoading = false,
  skeletonRows = 3,
  emptyMessage = "No data available",
  errorMessage,
}: {
  head: React.ReactNode[];
  body?: React.ReactNode[][] | React.ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  errorMessage?: string;
}) {
  const renderEmptyState = (msg: string) => (
    <tr>
      <td
        colSpan={head.length}
        className="py-6 px-4 text-center text-gray-400 italic"
      >
        {msg}
      </td>
    </tr>
  );

  return (
    <div className="overflow-x-auto rounded border border-border shadow-xl">
      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-bgSubtle text-text">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-4 py-2 font-medium text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading
            ? Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={`skeleton-${i}`}>
                  <td colSpan={head.length} className="py-4 px-4">
                    <Skeleton />
                  </td>
                </tr>
              ))
            : errorMessage
            ? renderEmptyState(errorMessage)
            : Array.isArray(body) && body.length > 0
            ? body.map((row, j) => (
                <tr key={j} className="hover:opacity-70">
                  {row.map((item, i) => (
                    <td key={i} className="py-2 px-4 text-gray-500">
                      {item}
                    </td>
                  ))}
                </tr>
              ))
            : renderEmptyState(emptyMessage)}
        </tbody>
      </table>
    </div>
  );
}
