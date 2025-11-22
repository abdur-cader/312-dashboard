import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ChartContainer from "./ChartContainer";
import LoadingSkeleton from "./LoadingSkeleton";

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

export default function AttendanceAnalytics({
  attendanceByMonth,
  attendanceByWeekday,
  attendanceBySemester,
  loadingAttendanceAnalytics,
}) {
  // Format attendance by month - combine year and month name
  const monthData = attendanceByMonth.map((item) => ({
    month: `${item.month_name || item.month} ${item.year || ""}`.trim(),
    count: item.count || 0,
  }));

  // Format weekday data - use first 3 letters
  const weekdayData = attendanceByWeekday.map((item) => ({
    weekday: item.weekday?.substring(0, 3) || item.weekday,
    count: item.count || 0,
  }));

  // Format semester data
  const semesterData = attendanceBySemester.map((item) => ({
    semester: item.semester_name || item.semester,
    count: item.count || 0,
  }));

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-blue-500">
          Attendance Analytics
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance by Month */}
        {loadingAttendanceAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Attendance by Month">
            {monthData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={monthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="month"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
                  <YAxis
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
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
                    fill="#06b6d4"
                    name="Records"
                    shape={<RoundedBar />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Attendance by Weekday */}
        {loadingAttendanceAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Attendance by Weekday">
            {weekdayData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weekdayData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="weekday"
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
                  <YAxis
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
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
                    fill="#84cc16"
                    name="Records"
                    shape={<RoundedBar />}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </ChartContainer>
        )}

        {/* Attendance by Semester */}
        {loadingAttendanceAnalytics ? (
          <LoadingSkeleton type="chart" height="300px" />
        ) : (
          <ChartContainer title="Attendance by Semester">
            {semesterData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={semesterData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="semester"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
                  <YAxis
                    stroke="#a1a1aa"
                    fontSize={12}
                    tick={{ fill: "#a1a1aa" }}
                  />
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
                    fill="#ec4899"
                    name="Records"
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
