import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import LoadingSkeleton from "./LoadingSkeleton";

export default function ClassAnalytics({ gradesByClass, studentsPerClass, classesByGradeLevel, loadingClassAnalytics }) {
  const classChartData = gradesByClass.map((item) => ({
    class: item.class_name?.replace("Grade ", "G") || "",
    avgGrade: parseFloat(item.avg_grade?.toFixed(2) || 0),
    records: item.num_records || 0,
  }));

  // Format classes by grade level - count classes per grade
  const classesByGradeData = classesByGradeLevel.map((item) => ({
    grade: `Grade ${item.grade_level}`,
    count: item.total_classes || 0,
  }));

  // Format students per class
  const studentsPerClassData = studentsPerClass.map((item) => ({
    class: item.class_name?.replace("Grade ", "G") || `Class ${item.class_id}`,
    count: item.student_count || 0,
  }));

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-1 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Class Analytics</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Classes per Grade Level */}
        {loadingClassAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Classes per Grade Level">
            {classesByGradeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={classesByGradeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="grade" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
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
                  <Bar dataKey="count" fill="#10b981" name="Classes" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Students per Class */}
        {loadingClassAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Students per Class">
            {studentsPerClassData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={studentsPerClassData.slice(0, 15)} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="class" angle={-45} textAnchor="end" height={100} stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
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
                  <Bar dataKey="count" fill="#8b5cf6" name="Students" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}
      </div>

      {/* Average Grades by Class */}
      {loadingClassAnalytics ? (
        <LoadingSkeleton type="chart" height="400px" />
      ) : (
        <ChartContainer title="Average Grades by Class" height={400}>
          {classChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={classChartData.slice(0, 20)} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="class" angle={-45} textAnchor="end" height={100} stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="avgGrade" fill="#f59e0b" name="Average Grade" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      )}
    </div>
  );
}
