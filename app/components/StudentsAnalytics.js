import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import { COLORS } from "../utils/constants";
import {
  processStudentsByNationality,
  processStudentsByGradeLevel,
  processStudentsPerClass,
} from "../utils/dataProcessors";

export default function StudentsAnalytics({ studentCount, debugSample }) {
  const genderPieData = studentCount?.by_gender?.map((item) => ({
    name: item.gender === "M" ? "Male" : "Female",
    value: item.count || 0,
  })) || [];

  const studentsByNationality = processStudentsByNationality(debugSample);
  const studentsByGradeLevel = processStudentsByGradeLevel(debugSample);
  const studentsPerClass = processStudentsPerClass(debugSample);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Students Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gender Distribution */}
        <ChartContainer title="Gender Distribution">
          {genderPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Students by Nationality */}
        <ChartContainer title="Students by Nationality">
          {studentsByNationality.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentsByNationality}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nationality" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#10b981" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Students per Grade Level */}
        <ChartContainer title="Students per Grade Level">
          {studentsByGradeLevel.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentsByGradeLevel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="grade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f59e0b" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Students per Class */}
        <ChartContainer title="Students per Class (Top 10)">
          {studentsPerClass.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentsPerClass.slice(0, 10)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8b5cf6" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      </div>

      {/* Student Table */}
      <div className="rounded-lg bg-white dark:bg-slate-800 shadow-lg p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Student Sample Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Name</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Gender</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Nationality</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Grade Level</th>
                <th className="pb-3 pr-4 text-sm font-semibold text-slate-600 dark:text-slate-400">Class ID</th>
              </tr>
            </thead>
            <tbody>
              {debugSample?.dim_students?.head?.slice(0, 10).map((student, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <td className="py-3 pr-4 text-slate-900 dark:text-white">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="py-3 pr-4 text-slate-900 dark:text-white">
                    {student.gender === "M" ? "Male" : "Female"}
                  </td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{student.nationality}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{student.grade_level}</td>
                  <td className="py-3 pr-4 text-slate-600 dark:text-slate-400">{student.class_id}</td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No student data available
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

