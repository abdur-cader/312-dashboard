export default function ErrorDisplay({ error }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 max-w-md">
        <h2 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">Connection Error</h2>
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </div>
    </div>
  );
}

