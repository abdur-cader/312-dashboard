import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import {
  processGradeDistribution,
  processGradeTrendByDate,
} from "../utils/dataProcessors";

export default function GradesAnalytics({ gradesByGender, debugSample }) {
  const genderChartData = gradesByGender.map((item) => ({
    gender: item.gender === "M" ? "Male" : "Female",
    avgGrade: parseFloat(item.avg_grade?.toFixed(2) || 0),
    records: item.num_records || 0,
  }));

  const gradeDistribution = processGradeDistribution(debugSample);
  const gradeTrendByDate = processGradeTrendByDate(debugSample);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Grades Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Average Grade by Gender */}
        <ChartContainer title="Average Grade by Gender">
          {genderChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgGrade" fill="#3b82f6" name="Average Grade" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Grade Distribution Histogram */}
        <ChartContainer title="Grade Distribution">
          {gradeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" name="Records" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      </div>

      {/* Grade Trend by Date */}
      <ChartContainer title="Grade Trend by Date" height={400}>
        {gradeTrendByDate.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={gradeTrendByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgGrade"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Average Grade"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : null}
      </ChartContainer>
    </div>
  );
}

