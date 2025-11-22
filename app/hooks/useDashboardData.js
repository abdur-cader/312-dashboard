import { useEffect, useState } from "react";
import { API_BASE } from "../utils/constants";

export function useDashboardData() {
  const [health, setHealth] = useState(null);
  const [studentCount, setStudentCount] = useState(null);
  const [gradesByGender, setGradesByGender] = useState([]);
  const [gradesByClass, setGradesByClass] = useState([]);
  const [debugSample, setDebugSample] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setError(null);

        // Fetch all data in parallel
        const [healthRes, studentRes, genderRes, classRes, debugRes] = await Promise.all([
          fetch(`${API_BASE}/health`).catch(() => null),
          fetch(`${API_BASE}/students/count`).catch(() => null),
          fetch(`${API_BASE}/grades/by-gender`).catch(() => null),
          fetch(`${API_BASE}/grades/by-class`).catch(() => null),
          fetch(`${API_BASE}/debug/sample`).catch(() => null),
        ]);

        if (healthRes?.ok) {
          const healthData = await healthRes.json();
          setHealth(healthData);
        }

        if (studentRes?.ok) {
          const studentData = await studentRes.json();
          setStudentCount(studentData);
        }

        if (genderRes?.ok) {
          const genderData = await genderRes.json();
          setGradesByGender(genderData.data || []);
        }

        if (classRes?.ok) {
          const classData = await classRes.json();
          setGradesByClass(classData.data || []);
        }

        if (debugRes?.ok) {
          const debugData = await debugRes.json();
          setDebugSample(debugData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to connect to API. Make sure the backend is running on http://localhost:5000");
      }
    };

    fetchAllData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchAllData, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    health,
    studentCount,
    gradesByGender,
    gradesByClass,
    debugSample,
    error,
  };
}

