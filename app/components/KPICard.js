export default function KPICard({ title, value }) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
    </div>
  );
}

