import { useMemo } from "react";
import KPICard from "./KPICard";
import LoadingSkeleton from "./LoadingSkeleton";
import CustomDropdown from "./CustomDropdown";

export default function KPISection({ 
  studentCount, 
  totalClasses, 
  totalAttendance, 
  averageGrade, 
  loadingKPIs,
  studentsList,
  studentsPagination,
  studentsCurrentPage,
  studentsPerPage,
  studentsFilters,
  changeStudentsPage,
  changeStudentsPerPage,
  updateStudentsFilters,
  loadingStudentsList,
  studentsByNationality,
  studentsByGradeLevel,
}) {
  const totalStudents = studentCount?.total_students || 0;

  // Get unique nationalities and grade levels for filter dropdowns
  const uniqueNationalities = useMemo(() => {
    return studentsByNationality.map((item) => item.nationality).sort();
  }, [studentsByNationality]);

  const uniqueGradeLevels = useMemo(() => {
    return studentsByGradeLevel.map((item) => item.grade_level).sort((a, b) => a - b);
  }, [studentsByGradeLevel]);

  // Update filters and trigger API call
  const handleSearchChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      search: value,
    });
  };

  const handleGenderChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      gender: value,
    });
  };

  const handleNationalityChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      nationality: value,
    });
  };

  const handleGradeLevelChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      grade_level: value,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    updateStudentsFilters({
      search: "",
      gender: "",
      nationality: "",
      grade_level: "",
    });
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Key Performance Indicators</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loadingKPIs ? (
          <>
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
          </>
        ) : (
          <>
            <KPICard
              title="Total Students"
              value={totalStudents}
              color="blue"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <KPICard
              title="Total Classes"
              value={totalClasses || "N/A"}
              color="green"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
            />
            <KPICard
              title="Attendance Records"
              value={totalAttendance || "N/A"}
              color="purple"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              }
            />
            <KPICard
              title="Average Grade"
              value={averageGrade ? averageGrade.toFixed(1) : "N/A"}
              color="orange"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Student Table */}
      <div className="rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Student Directory</h3>
          </div>
          {studentsPagination && (
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Per page:
                <select
                  value={studentsPerPage}
                  onChange={(e) => changeStudentsPerPage(Number(e.target.value))}
                  className="ml-2 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={200}>200</option>
                </select>
              </label>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-4 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by student name..."
                  value={studentsFilters.search || ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>
            {(studentsFilters.search || studentsFilters.gender || studentsFilters.nationality || studentsFilters.grade_level) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomDropdown
              label="Gender"
              value={studentsFilters.gender || ""}
              onChange={handleGenderChange}
              placeholder="All Genders"
              options={[
                { value: "", label: "All Genders" },
                { value: "M", label: "Male" },
                { value: "F", label: "Female" },
              ]}
            />

            <CustomDropdown
              label="Nationality"
              value={studentsFilters.nationality || ""}
              onChange={handleNationalityChange}
              placeholder="All Nationalities"
              options={[
                { value: "", label: "All Nationalities" },
                ...uniqueNationalities.map((nationality) => ({
                  value: nationality,
                  label: nationality,
                })),
              ]}
            />

            <CustomDropdown
              label="Grade Level"
              value={studentsFilters.grade_level || ""}
              onChange={handleGradeLevelChange}
              placeholder="All Grades"
              options={[
                { value: "", label: "All Grades" },
                ...uniqueGradeLevels.map((grade) => ({
                  value: grade.toString(),
                  label: `Grade ${grade}`,
                })),
              ]}
            />
          </div>
        </div>
        {loadingStudentsList ? (
          <LoadingSkeleton type="table" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Name</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Gender</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Nationality</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Grade Level</th>
                  <th className="pb-3 pr-4 text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Class ID</th>
                </tr>
              </thead>
              <tbody>
                {studentsList.length > 0 ? (
                  studentsList.map((student, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="py-4 pr-4 text-gray-900 dark:text-white font-medium">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="py-4 pr-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.gender === "M" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" 
                            : "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300"
                        }`}>
                          {student.gender === "M" ? "Male" : "Female"}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-gray-700 dark:text-gray-300">{student.nationality}</td>
                      <td className="py-4 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          Grade {student.grade_level}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-gray-600 dark:text-gray-400 font-mono text-sm">{student.class_id}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-500 dark:text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-base font-medium">No student data available</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination Controls */}
        {studentsPagination && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Showing <span className="font-bold text-gray-900 dark:text-white">{((studentsCurrentPage - 1) * studentsPerPage) + 1}</span> to{" "}
              <span className="font-bold text-gray-900 dark:text-white">{Math.min(studentsCurrentPage * studentsPerPage, studentsPagination.total)}</span> of{" "}
              <span className="font-bold text-gray-900 dark:text-white">{studentsPagination.total.toLocaleString()}</span> students
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => changeStudentsPage(studentsCurrentPage - 1)}
                disabled={studentsCurrentPage === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              <div className="flex items-center gap-1">
                {studentsPagination.total_pages <= 5 ? (
                  // Show all pages if 5 or fewer
                  Array.from({ length: studentsPagination.total_pages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => changeStudentsPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                          studentsCurrentPage === pageNum
                            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                            : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })
                ) : (
                  // Show 1, 2, 3, ..., max
                  <>
                    {[1, 2, 3].map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => changeStudentsPage(pageNum)}
                        className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                          studentsCurrentPage === pageNum
                            ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                            : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                    <span className="px-2 text-gray-400 dark:text-gray-500 font-medium">...</span>
                    <button
                      onClick={() => changeStudentsPage(studentsPagination.total_pages)}
                      className={`px-3 py-2 rounded-lg transition-colors font-medium text-sm ${
                        studentsCurrentPage === studentsPagination.total_pages
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md"
                          : "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      {studentsPagination.total_pages}
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={() => changeStudentsPage(studentsCurrentPage + 1)}
                disabled={studentsCurrentPage === studentsPagination.total_pages}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-1"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
