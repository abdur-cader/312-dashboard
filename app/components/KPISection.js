import KPICard from "./KPICard";

export default function KPISection({ studentCount, health, gradesByGender, gradesByClass }) {
  const totalStudents = studentCount?.total_students || health?.tables?.dim_students || 0;
  const totalClasses = gradesByClass.length || health?.tables?.dim_classes || 0;
  const totalAttendanceRecords = health?.tables?.fact_attendance || 0;
  const overallAvgGrade = gradesByGender.length > 0
    ? (
        gradesByGender.reduce(
          (sum, item) => sum + (item.avg_grade || 0) * (item.num_records || 0),
          0
        ) /
        gradesByGender.reduce((sum, item) => sum + (item.num_records || 0), 0)
      ).toFixed(1)
    : "N/A";

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Key Performance Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Students" value={totalStudents} />
        <KPICard title="Total Classes" value={totalClasses} />
        <KPICard title="Total Attendance Records" value={totalAttendanceRecords} />
        <KPICard title="Average Grade" value={overallAvgGrade} />
      </div>
    </div>
  );
}

