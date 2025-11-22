import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import {
  processAttendanceByMonth,
  processAttendanceByWeekday,
  processAttendanceBySemester,
} from "../utils/dataProcessors";

export default function AttendanceAnalytics({ debugSample }) {
  const attendanceByMonth = processAttendanceByMonth(debugSample);
  const attendanceByWeekday = processAttendanceByWeekday(debugSample);
  const attendanceBySemester = processAttendanceBySemester(debugSample);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Attendance Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance by Month */}
        <ChartContainer title="Attendance by Month">
          {attendanceByMonth.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#06b6d4" name="Records" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Attendance by Weekday */}
        <ChartContainer title="Attendance by Weekday">
          {attendanceByWeekday.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceByWeekday}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="weekday" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#84cc16" name="Records" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>

        {/* Attendance by Semester */}
        <ChartContainer title="Attendance by Semester">
          {attendanceBySemester.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceBySemester}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ec4899" name="Records" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </ChartContainer>
      </div>
    </div>
  );
}

