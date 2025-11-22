export default function ChartContainer({ title, children, height = 300 }) {
  return (
    <div className="rounded-xl bg-zinc-900 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 select-none">
      <div className="flex justify-center mb-5 pb-3">
        <h3 className="text-lg font-semibold text-white select-text text-center">
          {title}
        </h3>
      </div>
      <div className="select-none">
        {children || (
          <div
            className={`flex items-center justify-center text-gray-400`}
            style={{ height: `${height}px` }}
          >
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-sm">No data available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
