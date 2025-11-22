export default function KPICard({ title, value, icon, color = "#3b82f6" }) {
  return (
    <div
      className={`
      relative rounded-2xl bg-zinc-900 
      shadow-sm hover:shadow-xl 
      transition-all duration-500 ease-out
      p-6 border border-transparent
      hover:scale-[1.02] hover:-translate-y-1
      group overflow-hidden
    `}
      style={{
        "--card-color": color,
        borderColor: "transparent",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            {title}
          </p>
          <div
            className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
            }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
        </div>
        {icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
            }}
          >
            <div className="text-white text-lg">{icon}</div>
          </div>
        )}
      </div>

      {/* Subtle accent line */}
      <div
        className="w-16 h-0.5 opacity-50 group-hover:opacity-80 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)`,
        }}
      />
    </div>
  );
}
