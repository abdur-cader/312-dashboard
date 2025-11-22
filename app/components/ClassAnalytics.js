import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import { processClassesByGradeLevel } from "../utils/dataProcessors";

export default function ClassAnalytics({ gradesByClass, debugSample }) {
  const classChartData = gradesByClass.map((item) => ({
    class: item.class_name?.replace("Grade ", "G") || "",
    avgGrade: parseFloat(item.avg_grade?.toFixed(2) || 0),
    records: item.num_records || 0,
  }));

  const classesByGradeLevel = processClassesByGradeLevel(gradesByClass);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Class Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classes per Grade Level */}
        <ChartContainer title="Classes per Grade Level">
          {classesByGradeLevel.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classesByGradeLevel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" name="Classes" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Average Grades by Class */}
        <ChartContainer title="Average Grades by Class">
          {classChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classChartData.slice(0, 15)} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgGrade" fill="#f59e0b" name="Average Grade" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      </div>
    </div>
  );
}

