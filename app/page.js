"use client";
import { useState } from "react";
import { useDashboardData } from "./hooks/useDashboardData";
import ErrorDisplay from "./components/ErrorDisplay";
import Sidebar from "./components/Sidebar";
import KPISection from "./components/KPISection";
import StudentsAnalytics from "./components/StudentsAnalytics";
import GradesAnalytics from "./components/GradesAnalytics";
import AttendanceAnalytics from "./components/AttendanceAnalytics";
import ClassAnalytics from "./components/ClassAnalytics";
import SemestersSection from "./components/SemestersSection";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("kpis");
  const {
    health,
    studentCount,
    gradesByGender,
    gradesByClass,
    totalClasses,
    totalAttendance,
    averageGrade,
    studentsByNationality,
    studentsByGradeLevel,
    studentsList,
    studentsPagination,
    studentsCurrentPage,
    studentsPerPage,
    studentsFilters,
    changeStudentsPage,
    changeStudentsPerPage,
    updateStudentsFilters,
    gradeDistribution,
    gradeTrendByDate,
    attendanceByMonth,
    attendanceByWeekday,
    attendanceBySemester,
    studentsPerClass,
    classesByGradeLevel,
    semestersList,
    error,
    loadingKPIs,
    loadingStudentsAnalytics,
    loadingGradesAnalytics,
    loadingAttendanceAnalytics,
    loadingClassAnalytics,
    loadingSemesters,
    loadingStudentsList,
  } = useDashboardData();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-10 pb-6 border-b border-blue-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                  School Analytics Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  UAE School Management System
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-base">
              Comprehensive insights into student attendance, performance, and academic progress
            </p>
          </div>

          {/* Conditionally Render Sections */}
          {activeSection === "kpis" && (
            <KPISection
              studentCount={studentCount}
              totalClasses={totalClasses}
              totalAttendance={totalAttendance}
              averageGrade={averageGrade}
              loadingKPIs={loadingKPIs}
              studentsList={studentsList}
              studentsPagination={studentsPagination}
              studentsCurrentPage={studentsCurrentPage}
              studentsPerPage={studentsPerPage}
              studentsFilters={studentsFilters}
              changeStudentsPage={changeStudentsPage}
              changeStudentsPerPage={changeStudentsPerPage}
              updateStudentsFilters={updateStudentsFilters}
              loadingStudentsList={loadingStudentsList}
              studentsByNationality={studentsByNationality}
              studentsByGradeLevel={studentsByGradeLevel}
            />
          )}

          {activeSection === "students" && (
            <StudentsAnalytics
              studentCount={studentCount}
              studentsByNationality={studentsByNationality}
              studentsByGradeLevel={studentsByGradeLevel}
              loadingStudentsAnalytics={loadingStudentsAnalytics}
            />
          )}

          {activeSection === "grades" && (
            <GradesAnalytics
              gradesByGender={gradesByGender}
              gradeDistribution={gradeDistribution}
              gradeTrendByDate={gradeTrendByDate}
              loadingGradesAnalytics={loadingGradesAnalytics}
            />
          )}

          {activeSection === "attendance" && (
            <AttendanceAnalytics
              attendanceByMonth={attendanceByMonth}
              attendanceByWeekday={attendanceByWeekday}
              attendanceBySemester={attendanceBySemester}
              loadingAttendanceAnalytics={loadingAttendanceAnalytics}
            />
          )}

          {activeSection === "classes" && (
            <ClassAnalytics
              gradesByClass={gradesByClass}
              studentsPerClass={studentsPerClass}
              classesByGradeLevel={classesByGradeLevel}
              loadingClassAnalytics={loadingClassAnalytics}
            />
          )}

          {activeSection === "semesters" && (
            <SemestersSection 
              semestersList={semestersList}
              loadingSemesters={loadingSemesters}
            />
          )}
        </div>
      </div>
    </div>
  );
}
