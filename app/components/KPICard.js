export default function KPICard({ title, value, icon, color = "blue" }) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-emerald-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  const bgColorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20",
    green: "bg-emerald-50 dark:bg-emerald-900/20",
    purple: "bg-purple-50 dark:bg-purple-900/20",
    orange: "bg-orange-50 dark:bg-orange-900/20",
  };

  return (
    <div className={`rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 ${bgColorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            {title}
          </p>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center shadow-md`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

