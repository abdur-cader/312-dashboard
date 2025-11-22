import LoadingSkeleton from "./LoadingSkeleton";

export default function SemestersSection({ semestersList, loadingSemesters }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Semesters</h2>
      </div>
      
      {loadingSemesters ? (
        <LoadingSkeleton type="table" />
      ) : (
        <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-5 pb-3 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Semester Information</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Semester Name</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">End Date</th>
                </tr>
              </thead>
              <tbody>
                {semestersList.length > 0 ? (
                  semestersList.map((semester, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 pr-4 text-gray-900 dark:text-white font-semibold">{semester.semester_name}</td>
                      <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">{semester.start_date}</td>
                      <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">{semester.end_date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-12 text-center text-gray-500 dark:text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-base font-medium">No semester data available</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
