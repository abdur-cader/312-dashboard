export default function ChartContainer({ title, children, height = 300 }) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      {children || (
        <div className={`flex items-center justify-center text-slate-500`} style={{ height: `${height}px` }}>
          No data available
        </div>
      )}
    </div>
  );
}

