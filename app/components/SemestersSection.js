import { processSemestersData } from "../utils/dataProcessors";

export default function SemestersSection({ debugSample }) {
  const semestersData = processSemestersData(debugSample);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Semesters</h2>
      
      <div className="rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Semester Information</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Semester Name</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Start Date</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">End Date</th>
              </tr>
            </thead>
            <tbody>
              {semestersData.map((semester, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <td className="py-3 pr-4 text-slate-900 dark:text-white">{semester.name}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{semester.start_date}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{semester.end_date}</td>
                </tr>
              ))}
              {semestersData.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-slate-500">
                    No semester data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

