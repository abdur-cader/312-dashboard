export default function LoadingSkeleton({ type = "card", height = "auto" }) {
  if (type === "card") {
    return (
      <div className="rounded-xl bg-zinc-900 shadow-md p-6 border border-zinc-700 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-4 bg-zinc-700 rounded w-24 mb-3 p-1"></div>
            <div className="h-8 bg-zinc-700 rounded w-32 p-1"></div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-zinc-700 p-1"></div>
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="rounded-xl bg-zinc-900 shadow-md p-6 border border-zinc-700 animate-pulse">
        <div className="h-6 bg-zinc-700 rounded w-48 mb-4 p-1"></div>
        <div
          className="w-full bg-zinc-700 rounded p-1"
          style={{ height: height === "auto" ? "300px" : height }}
        ></div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="rounded-xl bg-zinc-900 shadow-md p-6 border border-zinc-700 animate-pulse">
        <div className="h-6 bg-zinc-700 rounded w-48 mb-4 p-1"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 bg-zinc-700 rounded flex-1 p-1"></div>
              <div className="h-4 bg-zinc-700 rounded w-24 p-1"></div>
              <div className="h-4 bg-zinc-700 rounded w-24 p-1"></div>
              <div className="h-4 bg-zinc-700 rounded w-24 p-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
