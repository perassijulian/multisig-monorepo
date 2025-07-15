import Skeleton from "./Skeleton";

export default function Table({
  head,
  body,
  isLoading = false,
  skeletonRows = 3,
}: {
  head: React.ReactNode[];
  body?: React.ReactNode[][] | React.ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
}) {
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
          {isLoading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`skeleton-${i}`}>
                <td colSpan={head.length} className="py-4 px-4">
                  <Skeleton />
                </td>
              </tr>
            ))
          ) : Array.isArray(body) ? (
            body.map((row, j) =>
              Array.isArray(row) ? (
                <tr key={j} className="hover:opacity-70">
                  {row.map((item, i) => (
                    <td key={i} className="py-2 px-4 text-gray-500">
                      {item}
                    </td>
                  ))}
                </tr>
              ) : (
                <tr key={j}>
                  <td colSpan={head.length} className="py-4 px-4 text-center">
                    {row}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan={head.length} className="py-4 px-4 text-center">
                {body}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
