import { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ChartContainer from "./ChartContainer";
import LoadingSkeleton from "./LoadingSkeleton";
import { COLORS } from "@/app/utils/constants";

// Custom bar shape with rounded top edges
const RoundedBar = (props) => {
  const { fill, x, y, width, height } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={6} // Horizontal radius for rounded corners
        ry={6} // Vertical radius for rounded corners
      />
    </g>
  );
};

export default function StudentsAnalytics({
  studentCount,
  studentsByNationality,
  studentsByGradeLevel,
  loadingStudentsAnalytics,
}) {
  const genderPieData =
    studentCount?.by_gender?.map((item) => ({
      name: item.gender === "M" ? "Male" : "Female",
      value: item.count || 0,
    })) || [];

  // Format students by grade level for chart
  const gradeLevelChartData = studentsByGradeLevel.map((item) => ({
    grade: `Grade ${item.grade_level}`,
    count: item.count || 0,
  }));

  // Format nationality data with colors
  const nationalityChartData = studentsByNationality.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-blue-500">Students Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(39, 39, 42, 0.95)",
                      border: "1px solid #52525b",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontWeight: "500",
                    }}
                    itemStyle={{ color: "#ffffff" }}
                    labelStyle={{ color: "#ffffff", fontWeight: "600" }}
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
            {nationalityChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nationalityChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis dataKey="nationality" stroke="#a1a1aa" fontSize={12} />
                  <YAxis stroke="#a1a1aa" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(39, 39, 42, 0.95)",
                      border: "1px solid #52525b",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontWeight: "500",
                    }}
                    itemStyle={{ color: "#ffffff" }}
                    labelStyle={{ color: "#ffffff", fontWeight: "600" }}
                  />
                  <Bar dataKey="count" name="Students" shape={<RoundedBar />} />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Students per Grade Level */}
        {loadingStudentsAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Students per Grade Level">
            {gradeLevelChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gradeLevelChartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis dataKey="grade" stroke="#a1a1aa" fontSize={12} />
                  <YAxis stroke="#a1a1aa" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(39, 39, 42, 0.95)",
                      border: "1px solid #52525b",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontWeight: "500",
                    }}
                    itemStyle={{ color: "#ffffff" }}
                    labelStyle={{ color: "#ffffff", fontWeight: "600" }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#f59e0b"
                    name="Students"
                    shape={<RoundedBar />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
