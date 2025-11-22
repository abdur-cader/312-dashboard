"use client";
import { useState } from "react";
import { useDashboardData } from "./hooks/useDashboardData";
import ErrorDisplay from "@/components/ErrorDisplay";
import Sidebar from "@/components/Sidebar";
import KPISection from "@/components/KPISection";
import StudentsAnalytics from "@/components/StudentsAnalytics";
import GradesAnalytics from "@/components/GradesAnalytics";
import AttendanceAnalytics from "@/components/AttendanceAnalytics";
import ClassAnalytics from "@/components/ClassAnalytics";
import SemestersSection from "@/components/SemestersSection";

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
    <div className="min-h-screen bg-zinc-950">
      {/* Blue Glow Effect */}

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="ml-64">
        <div className="absolute -top-1 left-10 right-0 h-1 bg-blue-500 shadow-[0_0_80px_30px_rgba(59,130,246,0.7)] z-49"></div>

        <div className="max-w-[100rem] mx-auto px-6 py-20">
          {/* Header - Simplified */}
          <div className="mb-8 flex flex-col items-center justify-center text-center">
            <div>
              <h1 className="text-2xl font-bold text-white">
                School Analytics
              </h1>
              <p className="text-sm text-gray-400">ISIT312 Project</p>
            </div>
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
