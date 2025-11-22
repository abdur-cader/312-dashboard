"use client";
import { useDashboardData } from "./hooks/useDashboardData";
import ErrorDisplay from "./components/ErrorDisplay";
import KPISection from "./components/KPISection";
import StudentsAnalytics from "./components/StudentsAnalytics";
import GradesAnalytics from "./components/GradesAnalytics";
import AttendanceAnalytics from "./components/AttendanceAnalytics";
import ClassAnalytics from "./components/ClassAnalytics";
import SemestersSection from "./components/SemestersSection";

export default function Dashboard() {
  const { health, studentCount, gradesByGender, gradesByClass, debugSample, error } = useDashboardData();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            School Analytics Dashboard ISIT312
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            ISIT312
          </p>
        </div>

        {/* Section 1: KPIs */}
        <KPISection
          studentCount={studentCount}
          health={health}
          gradesByGender={gradesByGender}
          gradesByClass={gradesByClass}
        />

        {/* Section 2: Students Analytics */}
        <StudentsAnalytics studentCount={studentCount} debugSample={debugSample} />

        {/* Section 3: Grades Analytics */}
        <GradesAnalytics gradesByGender={gradesByGender} debugSample={debugSample} />

        {/* Section 4: Attendance Analytics */}
        <AttendanceAnalytics debugSample={debugSample} />

        {/* Section 5: Class Analytics */}
        <ClassAnalytics gradesByClass={gradesByClass} debugSample={debugSample} />

        {/* Section 6: Semesters */}
        <SemestersSection debugSample={debugSample} />
      </div>
    </div>
  );
}
