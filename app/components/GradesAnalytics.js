import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import LoadingSkeleton from "./LoadingSkeleton";

export default function GradesAnalytics({ gradesByGender, gradeDistribution, gradeTrendByDate, loadingGradesAnalytics }) {
  const genderChartData = gradesByGender.map((item) => ({
    gender: item.gender === "M" ? "Male" : "Female",
    avgGrade: parseFloat(item.avg_grade?.toFixed(2) || 0),
    records: item.num_records || 0,
  }));

  // Format grade trend data
  const trendData = gradeTrendByDate.map((item) => ({
    date: item.date?.substring(5) || item.date, // Show MM-DD format
    avgGrade: parseFloat(item.average_grade?.toFixed(1) || 0),
  })).slice(0, 30); // Limit to 30 data points

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Grades Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Average Grade by Gender */}
        {loadingGradesAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Average Grade by Gender">
            {genderChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={genderChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="gender" />
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
                  <Bar dataKey="avgGrade" fill="#3b82f6" name="Average Grade" />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Grade Distribution Histogram */}
        {loadingGradesAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Grade Distribution">
            {gradeDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
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
                  <Bar dataKey="count" fill="#ef4444" name="Records" />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}
      </div>

      {/* Grade Trend by Date */}
      {loadingGradesAnalytics ? (
        <LoadingSkeleton type="chart" height="400px" />
      ) : (
        <ChartContainer title="Grade Trend by Date" height={400}>
          {trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trendData}>
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
      )}
    </div>
  );
}
