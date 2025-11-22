export function processStudentsByNationality(debugSample) {
  if (!debugSample?.dim_students?.head) return [];
  const counts = {};
  debugSample.dim_students.head.forEach((student) => {
    const nationality = student.nationality || "Unknown";
    counts[nationality] = (counts[nationality] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([nationality, count]) => ({ nationality, count }))
    .sort((a, b) => b.count - a.count);
}

export function processStudentsByGradeLevel(debugSample) {
  if (!debugSample?.dim_students?.head) return [];
  const counts = {};
  debugSample.dim_students.head.forEach((student) => {
    const grade = `Grade ${student.grade_level || "N/A"}`;
    counts[grade] = (counts[grade] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([grade, count]) => ({ grade, count }))
    .sort((a, b) => parseInt(a.grade.replace("Grade ", "")) - parseInt(b.grade.replace("Grade ", "")));
}

export function processStudentsPerClass(debugSample) {
  if (!debugSample?.dim_students?.head) return [];
  const counts = {};
  debugSample.dim_students.head.forEach((student) => {
    const classId = `Class ${student.class_id || "N/A"}`;
    counts[classId] = (counts[classId] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([classId, count]) => ({ class: classId, count }))
    .sort((a, b) => b.count - a.count);
}

export function processClassesByGradeLevel(gradesByClass) {
  if (!gradesByClass || gradesByClass.length === 0) return [];
  const counts = {};
  gradesByClass.forEach((item) => {
    const match = item.class_name?.match(/Grade (\d+)/);
    if (match) {
      const grade = `Grade ${match[1]}`;
      counts[grade] = (counts[grade] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([grade, count]) => ({ grade, count }))
    .sort((a, b) => parseInt(a.grade.replace("Grade ", "")) - parseInt(b.grade.replace("Grade ", "")));
}

export function processSemestersData(debugSample) {
  if (!debugSample?.dim_semesters?.head) return [];
  return debugSample.dim_semesters.head.map((semester) => ({
    name: semester.semester_name || "N/A",
    start_date: semester.start_date || "N/A",
    end_date: semester.end_date || "N/A",
  }));
}

export function processAttendanceByMonth(debugSample) {
  if (!debugSample?.fact_attendance?.head || !debugSample?.dim_date?.head) return [];
  const dateMap = {};
  debugSample.dim_date.head.forEach((date) => {
    dateMap[date.date_key] = date;
  });
  
  const counts = {};
  debugSample.fact_attendance.head.forEach((attendance) => {
    const date = dateMap[attendance.date_key];
    if (date && date.month) {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[parseInt(date.month) - 1] || date.month;
      counts[month] = (counts[month] || 0) + 1;
    }
  });
  return Object.entries(counts)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
}

export function processAttendanceByWeekday(debugSample) {
  if (!debugSample?.fact_attendance?.head || !debugSample?.dim_date?.head) return [];
  const dateMap = {};
  debugSample.dim_date.head.forEach((date) => {
    dateMap[date.date_key] = date;
  });
  
  const counts = {};
  debugSample.fact_attendance.head.forEach((attendance) => {
    const date = dateMap[attendance.date_key];
    if (date && date.day_of_week) {
      const weekday = date.day_of_week.substring(0, 3);
      counts[weekday] = (counts[weekday] || 0) + 1;
    }
  });
  const weekdayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return weekdayOrder.map((day) => ({
    weekday: day,
    count: counts[day] || 0,
  }));
}

export function processAttendanceBySemester(debugSample) {
  if (!debugSample?.fact_attendance?.head || !debugSample?.dim_semesters?.head) return [];
  const semesterMap = {};
  debugSample.dim_semesters.head.forEach((semester) => {
    semesterMap[semester.semester_key] = semester;
  });
  
  const counts = {};
  debugSample.fact_attendance.head.forEach((attendance) => {
    if (attendance.semester_key && attendance.semester_key !== "\\N") {
      const semester = semesterMap[attendance.semester_key];
      if (semester) {
        const name = semester.semester_name || "Unknown";
        counts[name] = (counts[name] || 0) + 1;
      }
    }
  });
  return Object.entries(counts)
    .map(([semester, count]) => ({ semester, count }))
    .sort((a, b) => a.semester.localeCompare(b.semester));
}

export function processGradeDistribution(debugSample) {
  if (!debugSample?.fact_attendance?.head) return [];
  const ranges = {
    "40-50": 0,
    "51-60": 0,
    "61-70": 0,
    "71-80": 0,
    "81-90": 0,
    "91-100": 0,
  };
  
  debugSample.fact_attendance.head.forEach((attendance) => {
    const grade = parseInt(attendance.grade);
    if (!isNaN(grade)) {
      if (grade >= 40 && grade <= 50) ranges["40-50"]++;
      else if (grade >= 51 && grade <= 60) ranges["51-60"]++;
      else if (grade >= 61 && grade <= 70) ranges["61-70"]++;
      else if (grade >= 71 && grade <= 80) ranges["71-80"]++;
      else if (grade >= 81 && grade <= 90) ranges["81-90"]++;
      else if (grade >= 91 && grade <= 100) ranges["91-100"]++;
    }
  });
  
  return Object.entries(ranges).map(([range, count]) => ({ range, count }));
}

export function processGradeTrendByDate(debugSample) {
  if (!debugSample?.fact_attendance?.head || !debugSample?.dim_date?.head) return [];
  const dateMap = {};
  debugSample.dim_date.head.forEach((date) => {
    dateMap[date.date_key] = date;
  });
  
  const dateGrades = {};
  debugSample.fact_attendance.head.forEach((attendance) => {
    const date = dateMap[attendance.date_key];
    if (date && date.date_value) {
      const dateStr = date.date_value;
      if (!dateGrades[dateStr]) {
        dateGrades[dateStr] = { sum: 0, count: 0 };
      }
      const grade = parseInt(attendance.grade);
      if (!isNaN(grade)) {
        dateGrades[dateStr].sum += grade;
        dateGrades[dateStr].count++;
      }
    }
  });
  
  return Object.entries(dateGrades)
    .map(([date, data]) => ({
      date: date.substring(5), // Show MM-DD format
      avgGrade: (data.sum / data.count).toFixed(1),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 30); // Limit to 30 data points for readability
}

