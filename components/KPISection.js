import { useMemo, useState } from "react";
import KPICard from "./KPICard";
import LoadingSkeleton from "./LoadingSkeleton";
import { Input } from "@/components/ui/input";
import CountUpComponent from "@/components/CountUpComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function KPISection({
  studentCount,
  totalClasses,
  totalAttendance,
  averageGrade,
  loadingKPIs,
  studentsList,
  studentsPagination,
  studentsCurrentPage,
  studentsPerPage,
  studentsFilters,
  changeStudentsPage,
  changeStudentsPerPage,
  updateStudentsFilters,
  loadingStudentsList,
  studentsByNationality,
  studentsByGradeLevel,
}) {
  const totalStudents = studentCount?.total_students || 0;
  const [pageInputValue, setPageInputValue] = useState("");
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);

  // Get unique nationalities and grade levels for filter dropdowns
  const uniqueNationalities = useMemo(() => {
    return studentsByNationality.map((item) => item.nationality).sort();
  }, [studentsByNationality]);

  const uniqueGradeLevels = useMemo(() => {
    return studentsByGradeLevel
      .map((item) => item.grade_level)
      .sort((a, b) => a - b);
  }, [studentsByGradeLevel]);

  // Update filters and trigger API call
  const handleSearchChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      search: value,
    });
  };

  const handleGenderChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      gender: value === "all" ? "" : value,
    });
  };

  const handleNationalityChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      nationality: value === "all" ? "" : value,
    });
  };

  const handleGradeLevelChange = (value) => {
    updateStudentsFilters({
      ...studentsFilters,
      grade_level: value === "all" ? "" : value,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    updateStudentsFilters({
      search: "",
      gender: "",
      nationality: "",
      grade_level: "",
    });
  };

  // Handle page input
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setPageInputValue(value);
    }
  };

  const handlePageInputSubmit = () => {
    if (pageInputValue) {
      const pageNum = parseInt(pageInputValue, 10);
      const maxPage = studentsPagination.total_pages;

      if (pageNum >= 1 && pageNum <= maxPage) {
        changeStudentsPage(pageNum);
        setIsPageDialogOpen(false);
        setPageInputValue("");
      }
    }
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  };

  // Pagination logic
  const renderPaginationItems = () => {
    if (!studentsPagination) return null;

    const items = [];
    const totalPages = studentsPagination.total_pages;
    const currentPage = studentsCurrentPage;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => changeStudentsPage(i)}
              isActive={currentPage === i}
              className={`font-medium text-sm ${
                currentPage === i
                  ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border-0"
                  : "bg-zinc-800 border border-gray-600 text-gray-300 hover:bg-zinc-700 cursor-pointer"
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => changeStudentsPage(1)}
            isActive={currentPage === 1}
            className={`font-medium text-sm ${
              currentPage === 1
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border-0"
                : "bg-zinc-800 border border-gray-600 text-gray-300 hover:bg-zinc-700 cursor-pointer"
            }`}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis after first page if current page is > 3
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 rounded-lg bg-zinc-800 border border-gray-600 text-gray-300 font-medium text-sm hover:bg-zinc-700 cursor-pointer"
                >
                  ...
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-800 border border-gray-600 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Go to Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Enter a page number between 1 and {totalPages}
                  </p>
                  <Input
                    type="text"
                    value={pageInputValue}
                    onChange={handlePageInputChange}
                    onKeyDown={handlePageInputKeyDown}
                    placeholder={`Page (1-${totalPages})`}
                    className="bg-zinc-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 cursor-text"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsPageDialogOpen(false)}
                      className="border-gray-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePageInputSubmit}
                      disabled={!pageInputValue}
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </PaginationItem>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          items.push(
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => changeStudentsPage(i)}
                isActive={currentPage === i}
                className={`font-medium text-sm ${
                  currentPage === i
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border-0"
                    : "bg-zinc-800 border border-gray-600 text-gray-300 hover:bg-zinc-700 cursor-pointer"
                }`}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      // Show ellipsis before last page if current page < totalPages - 2
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-3 py-2 rounded-lg bg-zinc-800 border border-gray-600 text-gray-300 font-medium text-sm hover:bg-zinc-700 cursor-pointer"
                >
                  ...
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-800 border border-gray-600 text-white">
                <DialogHeader>
                  <DialogTitle className="text-white">Go to Page</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Enter a page number between 1 and {totalPages}
                  </p>
                  <Input
                    type="text"
                    value={pageInputValue}
                    onChange={handlePageInputChange}
                    onKeyDown={handlePageInputKeyDown}
                    placeholder={`Page (1-${totalPages})`}
                    className="bg-zinc-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 cursor-text"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setIsPageDialogOpen(false)}
                      className="border-gray-600 text-gray-300 bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handlePageInputSubmit}
                      disabled={!pageInputValue}
                      className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Go
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </PaginationItem>
        );
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => changeStudentsPage(totalPages)}
            isActive={currentPage === totalPages}
            className={`font-medium text-sm ${
              currentPage === totalPages
                ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border-0"
                : "bg-zinc-800 border border-gray-600 text-gray-300 hover:bg-zinc-700 cursor-pointer"
            }`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-blue-200 dark:text-white">
          Key Performance Indicators
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loadingKPIs ? (
          <>
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
            <LoadingSkeleton type="card" />
          </>
        ) : (
          <>
            <KPICard
              title="Total Students"
              value={
                <CountUpComponent
                  value={totalStudents}
                  duration={2.5}
                  className="text-3xl font-bold"
                />
              }
              color="#3b82f6"
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              }
            />
            <KPICard
              title="Total Classes"
              value={
                totalClasses === "N/A" ? (
                  "N/A"
                ) : (
                  <CountUpComponent
                    value={totalClasses}
                    duration={2}
                    className="text-3xl font-bold"
                  />
                )
              }
              color="#10b981"
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              }
            />
            <KPICard
              title="Attendance Records"
              value={
                totalAttendance === "N/A" ? (
                  "N/A"
                ) : (
                  <CountUpComponent
                    value={totalAttendance}
                    duration={2.2}
                    className="text-3xl font-bold"
                  />
                )
              }
              color="#8b5cf6"
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              }
            />
            <KPICard
              title="Average Grade"
              value={
                averageGrade ? (
                  <CountUpComponent
                    value={averageGrade}
                    duration={2.8}
                    decimals={1}
                    suffix="%"
                    className="text-3xl font-bold"
                  />
                ) : (
                  "N/A"
                )
              }
              color="#f59e0b"
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Student Table */}
      <div
        className="relative rounded-2xl bg-zinc-900 shadow-sm p-6 border border-transparent overflow-hidden"
        style={{
          "--card-color": "#3b82f6",
          borderColor: "transparent",
        }}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #3b82f699 100%)",
              }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white">
              Student Directory
            </h3>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-4 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                type="text"
                placeholder="Search by student name..."
                value={studentsFilters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-600 bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors cursor-text"
              />
            </div>
            {(studentsFilters.search ||
              studentsFilters.gender ||
              studentsFilters.nationality ||
              studentsFilters.grade_level) && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="px-4 py-2.5 rounded-lg bg-zinc-800 border-gray-600 text-gray-300 font-medium text-sm flex items-center gap-2 hover:bg-zinc-700 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear Filters
              </Button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Gender
              </label>
              <Select
                value={studentsFilters.gender || ""}
                onValueChange={handleGenderChange}
              >
                <SelectTrigger className="w-full border border-gray-600 bg-zinc-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <SelectValue placeholder="All Genders" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border border-gray-600 text-white max-h-[200px]">
                  <SelectItem value="all" className="cursor-pointer">
                    All Genders
                  </SelectItem>
                  <SelectItem value="M" className="cursor-pointer">
                    Male
                  </SelectItem>
                  <SelectItem value="F" className="cursor-pointer">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Nationality
              </label>
              <Select
                value={studentsFilters.nationality || ""}
                onValueChange={handleNationalityChange}
              >
                <SelectTrigger className="w-full border border-gray-600 bg-zinc-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <SelectValue placeholder="All Nationalities" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border border-gray-600 text-white max-h-[300px]">
                  <SelectItem value="all" className="cursor-pointer">
                    All Nationalities
                  </SelectItem>
                  {uniqueNationalities.map((nationality) => (
                    <SelectItem
                      key={nationality}
                      value={nationality}
                      className="cursor-pointer"
                    >
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Grade Level
              </label>
              <Select
                value={studentsFilters.grade_level || ""}
                onValueChange={handleGradeLevelChange}
              >
                <SelectTrigger className="w-full border border-gray-600 bg-zinc-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border border-gray-600 text-white max-h-[250px]">
                  <SelectItem value="all" className="cursor-pointer">
                    All Grades
                  </SelectItem>
                  {uniqueGradeLevels.map((grade) => (
                    <SelectItem
                      key={grade}
                      value={grade.toString()}
                      className="cursor-pointer"
                    >
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        {loadingStudentsList ? (
          <LoadingSkeleton type="table" />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-gray-700 bg-zinc-800/50 hover:bg-zinc-800/50">
                  <TableHead className="pb-3 pr-4 text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Name
                  </TableHead>
                  <TableHead className="pb-3 pr-4 text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Gender
                  </TableHead>
                  <TableHead className="pb-3 pr-4 text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Nationality
                  </TableHead>
                  <TableHead className="pb-3 pr-4 text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Grade Level
                  </TableHead>
                  <TableHead className="pb-3 pr-4 text-sm font-bold text-gray-300 uppercase tracking-wider">
                    Class ID
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsList.length > 0 ? (
                  studentsList.map((student, index) => (
                    <TableRow
                      key={index}
                      className="border-b border-gray-700 hover:bg-zinc-800/30 cursor-pointer"
                    >
                      <TableCell className="py-4 pr-4 text-white font-medium">
                        {student.first_name} {student.last_name}
                      </TableCell>
                      <TableCell className="py-4 pr-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            student.gender === "M"
                              ? "bg-blue-900/30 text-blue-300"
                              : "bg-pink-900/30 text-pink-300"
                          }`}
                        >
                          {student.gender === "M" ? "Male" : "Female"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 pr-4 text-gray-300">
                        {student.nationality}
                      </TableCell>
                      <TableCell className="py-4 pr-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-900/30 text-indigo-300">
                          Grade {student.grade_level}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 pr-4 text-gray-400 font-mono text-sm">
                        {student.class_id}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-gray-400"
                    >
                      <svg
                        className="w-16 h-16 mx-auto mb-3 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <p className="text-base font-medium text-white">
                        No student data available
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination Controls */}
        {studentsPagination && (
          <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400 font-medium whitespace-nowrap">
              Showing{" "}
              <span className="font-bold text-white">
                {(studentsCurrentPage - 1) * studentsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-white">
                {Math.min(
                  studentsCurrentPage * studentsPerPage,
                  studentsPagination.total
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold text-white">
                {studentsPagination.total.toLocaleString()}
              </span>{" "}
              students
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => changeStudentsPage(studentsCurrentPage - 1)}
                    disabled={studentsCurrentPage === 1}
                    className="px-4 py-2 rounded-lg bg-zinc-800 border border-gray-600 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm hover:bg-zinc-700 cursor-pointer"
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => changeStudentsPage(studentsCurrentPage + 1)}
                    disabled={
                      studentsCurrentPage === studentsPagination.total_pages
                    }
                    className="px-4 py-2 rounded-lg bg-zinc-800 border border-gray-600 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm hover:bg-zinc-700 cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Subtle accent line */}
        <div
          className="w-16 h-0.5 opacity-50"
          style={{
            background: "linear-gradient(90deg, #3b82f6 0%, #3b82f699 100%)",
          }}
        />
      </div>
    </div>
  );
}
