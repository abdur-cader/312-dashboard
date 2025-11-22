import { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import LoadingSkeleton from "./LoadingSkeleton";
import { COLORS } from "../utils/constants";

export default function StudentsAnalytics({
  studentCount,
  studentsByNationality,
  studentsByGradeLevel,
  loadingStudentsAnalytics,
}) {

  const genderPieData = studentCount?.by_gender?.map((item) => ({
    name: item.gender === "M" ? "Male" : "Female",
    value: item.count || 0,
  })) || [];

  // Format students by grade level for chart
  const gradeLevelChartData = studentsByGradeLevel.map((item) => ({
    grade: `Grade ${item.grade_level}`,
    count: item.count || 0,
  }));


  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Students Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gender Distribution */}
        {loadingStudentsAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
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
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: '500'
                    }}
                    itemStyle={{ color: '#000000' }}
                    labelStyle={{ color: '#000000', fontWeight: '600' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Students by Nationality */}
        {loadingStudentsAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Students by Nationality">
            {studentsByNationality.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentsByNationality}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nationality" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: '500'
                    }}
                    itemStyle={{ color: '#000000' }}
                    labelStyle={{ color: '#000000', fontWeight: '600' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#10b981" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Students per Grade Level */}
        {loadingStudentsAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Students per Grade Level">
            {gradeLevelChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeLevelChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      color: '#000000',
                      fontWeight: '500'
                    }}
                    itemStyle={{ color: '#000000' }}
                    labelStyle={{ color: '#000000', fontWeight: '600' }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#f59e0b" name="Students" />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
