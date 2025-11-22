import { useEffect, useState, useRef } from "react";
import { API_BASE } from "../utils/constants";

export function useDashboardData() {
  const [health, setHealth] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [gradesByGender, setGradesByGender] = useState([]);
  const [gradesByClass, setGradesByClass] = useState([]);
  
  // KPI endpoints
  const [totalClasses, setTotalClasses] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(null);
  const [averageGrade, setAverageGrade] = useState(null);
  
  // Students Analytics
  const [studentsByNationality, setStudentsByNationality] = useState([]);
  const [studentsByGradeLevel, setStudentsByGradeLevel] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [studentsPagination, setStudentsPagination] = useState(null);
  const [studentsCurrentPage, setStudentsCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(50);
  const [studentsFilters, setStudentsFilters] = useState({
    search: "",
    gender: "",
    nationality: "",
    grade_level: "",
  });
  
  // Grades Analytics
  const [gradeDistribution, setGradeDistribution] = useState([]);
  const [gradeTrendByDate, setGradeTrendByDate] = useState([]);
  
  // Attendance Analytics
  const [attendanceByMonth, setAttendanceByMonth] = useState([]);
  const [attendanceByWeekday, setAttendanceByWeekday] = useState([]);
  const [attendanceBySemester, setAttendanceBySemester] = useState([]);
  
  // Class Analytics
  const [studentsPerClass, setStudentsPerClass] = useState([]);
  const [classesByGradeLevel, setClassesByGradeLevel] = useState([]);
  
  // Semesters
  const [semestersList, setSemestersList] = useState([]);
  
  const [error, setError] = useState(null);
  const fetchingRef = useRef(false);
  
  // Loading states for each section
  const [loadingKPIs, setLoadingKPIs] = useState(true);
  const [loadingStudentsAnalytics, setLoadingStudentsAnalytics] = useState(true);
  const [loadingGradesAnalytics, setLoadingGradesAnalytics] = useState(true);
  const [loadingAttendanceAnalytics, setLoadingAttendanceAnalytics] = useState(true);
  const [loadingClassAnalytics, setLoadingClassAnalytics] = useState(true);
  const [loadingSemesters, setLoadingSemesters] = useState(true);
  const [loadingStudentsList, setLoadingStudentsList] = useState(true);

  // Fetch all data except student list on initial load
  useEffect(() => {
    // Prevent multiple simultaneous fetches
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    
    let isMounted = true;
    const abortController = new AbortController();
    
    const fetchAllData = async () => {
      try {
        setError(null);

        // Fetch all data in parallel (excluding student list)
        const fetchOptions = { signal: abortController.signal };
        const [
          healthRes,
          studentRes,
          genderRes,
          classRes,
          totalClassesRes,
          totalAttendanceRes,
          averageGradeRes,
          nationalityRes,
          gradeLevelRes,
          gradeDistRes,
          gradeTrendRes,
          attendanceMonthRes,
          attendanceWeekdayRes,
          attendanceSemesterRes,
          studentsPerClassRes,
          classesByGradeRes,
          semestersRes,
        ] = await Promise.all([
          fetch(`${API_BASE}/health`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/students/count`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/grades/by-gender`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/grades/by-class`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/kpis/total-classes`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/kpis/total-attendance`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/kpis/average-grade`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/students/by-nationality`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/students/by-grade-level`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/grades/distribution`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/grades/trend-by-date`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/attendance/by-month`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/attendance/by-weekday`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/attendance/by-semester`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/classes/students-per-class`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/classes/by-grade-level`, fetchOptions).catch(() => null),
          fetch(`${API_BASE}/semesters/list`, fetchOptions).catch(() => null),
        ]);
        
        // Check if component is still mounted before processing results
        if (!isMounted) return;

        // Process all responses only if still mounted
        if (healthRes?.ok && isMounted) {
          const healthData = await healthRes.json();
          if (isMounted) setHealth(healthData);
        }

        if (studentRes?.ok && isMounted) {
          const studentData = await studentRes.json();
          if (isMounted) {
            setStudentCount(studentData);
            setLoadingKPIs(false);
          }
        }

        if (genderRes?.ok && isMounted) {
          const genderData = await genderRes.json();
          if (isMounted) {
            setGradesByGender(genderData.data || []);
            setLoadingGradesAnalytics(false);
          }
        }

        if (classRes?.ok && isMounted) {
          const classData = await classRes.json();
          if (isMounted) setGradesByClass(classData.data || []);
        }

        if (totalClassesRes?.ok && isMounted) {
          const data = await totalClassesRes.json();
          if (isMounted) {
            setTotalClasses(data.total_classes);
            setLoadingKPIs(false);
          }
        }

        if (totalAttendanceRes?.ok && isMounted) {
          const data = await totalAttendanceRes.json();
          if (isMounted) {
            setTotalAttendance(data.total_attendance_records);
            setLoadingKPIs(false);
          }
        }

        if (averageGradeRes?.ok && isMounted) {
          const data = await averageGradeRes.json();
          if (isMounted) {
            setAverageGrade(data.average_grade);
            setLoadingKPIs(false);
          }
        }

        if (nationalityRes?.ok && isMounted) {
          const data = await nationalityRes.json();
          if (isMounted) {
            setStudentsByNationality(data.data || []);
            setLoadingStudentsAnalytics(false);
          }
        }

        if (gradeLevelRes?.ok && isMounted) {
          const data = await gradeLevelRes.json();
          if (isMounted) {
            setStudentsByGradeLevel(data.data || []);
            setLoadingStudentsAnalytics(false);
          }
        }

        if (gradeDistRes?.ok && isMounted) {
          const data = await gradeDistRes.json();
          if (isMounted) {
            setGradeDistribution(data.data || []);
            setLoadingGradesAnalytics(false);
          }
        }

        if (gradeTrendRes?.ok && isMounted) {
          const data = await gradeTrendRes.json();
          if (isMounted) {
            setGradeTrendByDate(data.data || []);
            setLoadingGradesAnalytics(false);
          }
        }

        if (attendanceMonthRes?.ok && isMounted) {
          const data = await attendanceMonthRes.json();
          if (isMounted) {
            setAttendanceByMonth(data.data || []);
            setLoadingAttendanceAnalytics(false);
          }
        }

        if (attendanceWeekdayRes?.ok && isMounted) {
          const data = await attendanceWeekdayRes.json();
          if (isMounted) {
            setAttendanceByWeekday(data.data || []);
            setLoadingAttendanceAnalytics(false);
          }
        }

        if (attendanceSemesterRes?.ok && isMounted) {
          const data = await attendanceSemesterRes.json();
          if (isMounted) {
            setAttendanceBySemester(data.data || []);
            setLoadingAttendanceAnalytics(false);
          }
        }

        if (studentsPerClassRes?.ok && isMounted) {
          const data = await studentsPerClassRes.json();
          if (isMounted) {
            setStudentsPerClass(data.data || []);
            setLoadingClassAnalytics(false);
          }
        }

        if (classesByGradeRes?.ok && isMounted) {
          const data = await classesByGradeRes.json();
          if (isMounted) {
            setClassesByGradeLevel(data.data || []);
            setLoadingClassAnalytics(false);
          }
        }

        if (semestersRes?.ok && isMounted) {
          const data = await semestersRes.json();
          if (isMounted) {
            setSemestersList(data.data || []);
            setLoadingSemesters(false);
          }
        }
      } catch (err) {
        // Ignore abort errors
        if (err.name === 'AbortError') return;
        
        if (isMounted) {
          console.error("Error fetching data:", err);
          setError("Failed to connect to API. Make sure the backend is running on http://localhost:5000");
        }
      } finally {
        fetchingRef.current = false;
      }
    };

    fetchAllData();
    
    return () => {
      isMounted = false;
      abortController.abort();
      fetchingRef.current = false;
    };
  }, []); // Only run once on mount

  // Fetch student list separately when pagination or filters change
  useEffect(() => {
    let isMounted = true;
    
    const fetchStudentsList = async () => {
      setLoadingStudentsList(true);
      try {
        // Build query parameters
        const params = new URLSearchParams({
          page: studentsCurrentPage.toString(),
          per_page: studentsPerPage.toString(),
        });

        // Add filter parameters if they have values
        if (studentsFilters.search) {
          params.append("search", studentsFilters.search);
        }
        if (studentsFilters.gender) {
          params.append("gender", studentsFilters.gender);
        }
        if (studentsFilters.nationality) {
          params.append("nationality", studentsFilters.nationality);
        }
        if (studentsFilters.grade_level) {
          params.append("grade_level", studentsFilters.grade_level);
        }

        const studentsListRes = await fetch(
          `${API_BASE}/students/list?${params.toString()}`
        ).catch(() => null);

        if (studentsListRes?.ok && isMounted) {
          const data = await studentsListRes.json();
          setStudentsList(data.data || []);
          setStudentsPagination(data.pagination || null);
          setLoadingStudentsList(false);
        } else if (isMounted) {
          setLoadingStudentsList(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching student list:", err);
          setLoadingStudentsList(false);
        }
      }
    };

    fetchStudentsList();
    
    return () => {
      isMounted = false;
    };
  }, [studentsCurrentPage, studentsPerPage, studentsFilters.search, studentsFilters.gender, studentsFilters.nationality, studentsFilters.grade_level]); // Fetch when pagination or filters change

  // Functions to change student list page
  const changeStudentsPage = (newPage) => {
    if (newPage >= 1 && (!studentsPagination || newPage <= studentsPagination.total_pages)) {
      setStudentsCurrentPage(newPage);
    }
  };

  const changeStudentsPerPage = (newPerPage) => {
    setStudentsPerPage(newPerPage);
    setStudentsCurrentPage(1); // Reset to first page when changing per page
  };

  const updateStudentsFilters = (newFilters) => {
    setStudentsFilters(newFilters);
    setStudentsCurrentPage(1); // Reset to first page when filters change
  };

  return {
    health,
    studentCount,
    gradesByGender,
    gradesByClass,
    totalClasses,
    totalAttendance,
    averageGrade,
    studentsByNationality,
    studentsByGradeLevel,
    studentsList,
    studentsPagination,
    studentsCurrentPage,
    studentsPerPage,
    studentsFilters,
    changeStudentsPage,
    changeStudentsPerPage,
    updateStudentsFilters,
    gradeDistribution,
    gradeTrendByDate,
    attendanceByMonth,
    attendanceByWeekday,
    attendanceBySemester,
    studentsPerClass,
    classesByGradeLevel,
    semestersList,
    error,
    loadingKPIs,
    loadingStudentsAnalytics,
    loadingGradesAnalytics,
    loadingAttendanceAnalytics,
    loadingClassAnalytics,
    loadingSemesters,
    loadingStudentsList,
  };
}
