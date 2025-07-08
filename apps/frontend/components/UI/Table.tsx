export default function Table({ head, body }: { head: any[]; body: any[][] }) {
  return (
    <div className="overflow-x-auto rounded border border-border shadow-sm">
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
          {body.map((row, j) => (
            <tr key={j} className="hover:opacity-70">
              {row.map((item, i) => (
                <td key={i} className="py-2 px-4 text-gray-500">
                  {item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
