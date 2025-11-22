export default function LoadingSkeleton({ type = "card", height = "auto" }) {
  if (type === "card") {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  if (type === "chart") {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div 
          className="w-full bg-gray-200 dark:bg-gray-700 rounded"
          style={{ height: height === "auto" ? "300px" : height }}
        ></div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

