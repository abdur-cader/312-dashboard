import LoadingSkeleton from "./LoadingSkeleton";

export default function SemestersSection({ semestersList, loadingSemesters }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-blue-500">Semesters</h2>
      </div>

      {loadingSemesters ? (
        <LoadingSkeleton type="table" />
      ) : (
        <div className="rounded-xl bg-zinc-900 shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
          <div className="flex items-center gap-3 mb-5 pb-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Semester Information
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider bg-zinc-800/50 rounded-l-lg">
                    Semester Name
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider bg-zinc-800/50">
                    Start Date
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-white uppercase tracking-wider bg-zinc-800/50 rounded-r-lg">
                    End Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {semestersList.length > 0 ? (
                  semestersList.map((semester, index) => (
                    <tr
                      key={index}
                      className="hover:bg-zinc-800 transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-semibold">
                        {semester.semester_name}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {semester.start_date}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {semester.end_date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-12 text-center text-gray-400">
                      <svg
                        className="w-16 h-16 mx-auto mb-3 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-base font-medium">
                        No semester data available
                      </p>
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
