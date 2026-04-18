//src/pages/CollegeManagement.jsx
import MainLayout from "../layouts/MainLayout"; 
import React, { useState, useEffect } from "react";
import api from "../components/api/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  DollarSign,
  BookOpen,
  Clock,
  BarChart3,
} from "lucide-react";

const CollegeManagement = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // ---------- Data from API ----------
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [fees, setFees] = useState([]);

  // ---------- Dashboard stats ----------
  const totalStudents = courses.reduce((sum, c) => sum + (c.students || 0), 0);
  const totalFeesCollected = fees.filter(f => f.status === 'Paid').reduce((sum, f) => sum + parseFloat(f.amount), 0);
  const totalFeesPending = fees.filter(f => f.status === 'Pending').reduce((sum, f) => sum + parseFloat(f.amount), 0);
  
  const todayAttendance = attendance.length > 0 ? attendance[attendance.length - 1] : null;
  const attendancePercent = todayAttendance && todayAttendance.total > 0 
    ? Math.round((todayAttendance.present / todayAttendance.total) * 100) 
    : 0;

  const dashboardStats = [
    { id: 1, title: "Today's Attendance", value: `${attendancePercent}%`, icon: Clock, color: "from-emerald-400 to-emerald-500" },
    { id: 2, title: "Total Students", value: totalStudents.toLocaleString(), icon: Users, color: "from-sky-400 to-sky-500" },
    { id: 3, title: "Pending Fees", value: `₹${(totalFeesPending / 100000).toFixed(1)}L`, icon: DollarSign, color: "from-orange-400 to-orange-500" },
    { id: 4, title: "Active Courses", value: courses.length.toString(), icon: BookOpen, color: "from-violet-400 to-violet-500" },
  ];

  // ---------- Fetch data ----------
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [coursesRes, facultyRes, timetableRes, attendanceRes, feesRes] = await Promise.all([
        api.get('/api/college/courses/'),
        api.get('/api/college/faculty/'),
        api.get('/api/college/timetable/'),
        api.get('/api/college/attendance/'),
        api.get('/api/college/fees/'),
      ]);
      setCourses(coursesRes.data);
      setFaculty(facultyRes.data);
      setTimetable(timetableRes.data);
      setAttendance(attendanceRes.data);
      const feeRecords = (feesRes.data || []).map((f) => ({
        ...f,
        student_name: f.student_name || f.student || "",
        course_name: f.course_name || "",
      }));
      setFees(feeRecords);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  // ---------- Course form state ----------
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseForm, setCourseForm] = useState({ name: "", credits: 4, students: 0, fees: 0 });
  const [highlightCourseId, setHighlightCourseId] = useState(null);

  useEffect(() => {
    if (!highlightCourseId) return;
    const t = setTimeout(() => setHighlightCourseId(null), 600);
    return () => clearTimeout(t);
  }, [highlightCourseId]);

  const openNewCourseForm = () => {
    setEditingCourse(null);
    setCourseForm({ name: "", credits: 4, students: 0, fees: 0 });
    setShowCourseForm(true);
  };

  const openEditCourseForm = (course) => {
    setEditingCourse(course);
    setCourseForm({ name: course.name, credits: course.credits, students: course.students, fees: parseFloat(course.fees) });
    setShowCourseForm(true);
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({
      ...prev,
      [name]: name === "credits" || name === "students" || name === "fees" ? Number(value) : value,
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    if (!courseForm.name.trim()) return;
    try {
      if (editingCourse) {
        await api.put(`/api/college/courses/${editingCourse.id}/`, courseForm);
      } else {
        await api.post('/api/college/courses/', courseForm);
      }
      fetchData();
      setShowCourseForm(false);
      setEditingCourse(null);
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Error saving course");
    }
  };

  const handleCourseDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await api.delete(`/api/college/courses/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // ---------- Faculty form state ----------
  const [showFacultyForm, setShowFacultyForm] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [facultyForm, setFacultyForm] = useState({ name: "", subject: "", phone: "", email: "", department: "" });
  const [highlightFacultyId, setHighlightFacultyId] = useState(null);

  useEffect(() => {
    if (!highlightFacultyId) return;
    const t = setTimeout(() => setHighlightFacultyId(null), 600);
    return () => clearTimeout(t);
  }, [highlightFacultyId]);

  const openNewFacultyForm = () => {
    setEditingFaculty(null);
    setFacultyForm({ name: "", subject: "", phone: "", email: "", department: "" });
    setShowFacultyForm(true);
  };

  const openEditFacultyForm = (f) => {
    setEditingFaculty(f);
    setFacultyForm({ name: f.name, subject: f.subject, phone: f.phone || "", email: f.email || "", department: f.department || "" });
    setShowFacultyForm(true);
  };

  const handleFacultyChange = (e) => {
    const { name, value } = e.target;
    setFacultyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    if (!facultyForm.name.trim()) return;
    try {
      if (editingFaculty) {
        await api.put(`/api/college/faculty/${editingFaculty.id}/`, facultyForm);
      } else {
        await api.post('/api/college/faculty/', facultyForm);
      }
      fetchData();
      setShowFacultyForm(false);
      setEditingFaculty(null);
    } catch (err) {
      console.error("Error saving faculty:", err);
    }
  };

  const handleFacultyDelete = async (id) => {
    if (!window.confirm("Remove this faculty?")) return;
    try {
      await api.delete(`/api/college/faculty/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting faculty:", err);
    }
  };

  // ---------- Timetable form state ----------
  const [showTTForm, setShowTTForm] = useState(false);
  const [editingTT, setEditingTT] = useState(null);
  const [ttForm, setTtForm] = useState({ day: "Monday", course: "", slot: "", room: "", faculty: "" });
  const [highlightTTId, setHighlightTTId] = useState(null);

  useEffect(() => {
    if (!highlightTTId) return;
    const t = setTimeout(() => setHighlightTTId(null), 600);
    return () => clearTimeout(t);
  }, [highlightTTId]);

  const openNewTTForm = () => {
    setEditingTT(null);
    setTtForm({ day: "Monday", course: "", slot: "", room: "", faculty: "" });
    setShowTTForm(true);
  };

  const openEditTTForm = (row) => {
    setEditingTT(row);
    setTtForm({ 
      day: row.day, 
      course: row.course, 
      slot: row.slot, 
      room: row.room, 
      faculty: row.faculty || "" 
    });
    setShowTTForm(true);
  };

  const handleTTChange = (e) => {
    const { name, value } = e.target;
    setTtForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTTSubmit = async (e) => {
    e.preventDefault();
    if (!ttForm.course || !ttForm.slot || !ttForm.room) {
      alert("Please fill in all required fields: Course, Time Slot, and Room");
      return;
    }
    try {
      const courseInt = parseInt(ttForm.course);
      if (isNaN(courseInt)) {
        alert("Please select a valid course");
        return;
      }
      const payload = { 
        ...ttForm, 
        course: courseInt, 
        faculty: ttForm.faculty ? parseInt(ttForm.faculty) : null 
      };
      if (editingTT) {
        await api.put(`/api/college/timetable/${editingTT.id}/`, payload);
      } else {
        await api.post('/api/college/timetable/', payload);
      }
      fetchData();
      setShowTTForm(false);
      setEditingTT(null);
    } catch (err) {
      console.error("Error saving timetable:", err);
      console.error("Error details:", err.response?.data);
      const errorMsg = err.response?.data?.course?.[0] || 
                       err.response?.data?.slot?.[0] || 
                       err.response?.data?.room?.[0] || 
                       "Error saving timetable";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleTTDelete = async (id) => {
    if (!window.confirm("Delete this timetable entry?")) return;
    try {
      await api.delete(`/api/college/timetable/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting timetable:", err);
    }
  };

  // ---------- Attendance form state ----------
  const [showAttForm, setShowAttForm] = useState(false);
  const [editingAtt, setEditingAtt] = useState(null);
  const [attForm, setAttForm] = useState({ date: "", course: "", present: 0, total: 0, status: "Good" });
  const [highlightAttId, setHighlightAttId] = useState(null);

  useEffect(() => {
    if (!highlightAttId) return;
    const t = setTimeout(() => setHighlightAttId(null), 600);
    return () => clearTimeout(t);
  }, [highlightAttId]);

  const openNewAttForm = () => {
    setEditingAtt(null);
    setAttForm({ date: "", course: "", present: 0, total: 0, status: "Good" });
    setShowAttForm(true);
  };

  const openEditAttForm = (row) => {
    setEditingAtt(row);
    setAttForm({ 
      date: row.date, 
      course: row.course, 
      present: row.present, 
      total: row.total, 
      status: row.status 
    });
    setShowAttForm(true);
  };

  const handleAttChange = (e) => {
    const { name, value } = e.target;
    setAttForm((prev) => ({
      ...prev,
      [name]: name === "present" || name === "total" ? Number(value) : value,
    }));
  };

  const handleAttSubmit = async (e) => {
    e.preventDefault();
    if (!attForm.date || !attForm.course) {
      alert("Please fill in all required fields: Date and Course");
      return;
    }
    if (attForm.present > attForm.total) {
      alert("Present count cannot be greater than total students");
      return;
    }
    try {
      const courseInt = parseInt(attForm.course);
      if (isNaN(courseInt)) {
        alert("Please select a valid course");
        return;
      }
      const payload = { 
        ...attForm, 
        course: courseInt 
      };
      if (editingAtt) {
        await api.put(`/api/college/attendance/${editingAtt.id}/`, payload);
      } else {
        await api.post('/api/college/attendance/', payload);
      }
      fetchData();
      setShowAttForm(false);
      setEditingAtt(null);
    } catch (err) {
      console.error("Error saving attendance:", err);
      console.error("Error details:", err.response?.data);
      const errorMsg = err.response?.data?.course?.[0] || 
                       err.response?.data?.date?.[0] || 
                       err.response?.data?.present?.[0] || 
                       "Error saving attendance";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleAttDelete = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;
    try {
      await api.delete(`/api/college/attendance/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting attendance:", err);
    }
  };

  // ---------- Fee form state ----------
  const [showFeeForm, setShowFeeForm] = useState(false);
  const [editingFee, setEditingFee] = useState(null);
  const [feeForm, setFeeForm] = useState({ student_name: "", course: "", amount: 0, status: "Pending", date: "" });
  const [highlightFeeId, setHighlightFeeId] = useState(null);

  useEffect(() => {
    if (!highlightFeeId) return;
    const t = setTimeout(() => setHighlightFeeId(null), 600);
    return () => clearTimeout(t);
  }, [highlightFeeId]);

  const openNewFeeForm = () => {
    setEditingFee(null);
    setFeeForm({ student_name: "", course: "", amount: 0, status: "Pending", date: "" });
    setShowFeeForm(true);
  };

  const openEditFeeForm = (row) => {
    setEditingFee(row);
    setFeeForm({ 
      student_name: row.student_name || row.student || "", 
      course: row.course, 
      amount: parseFloat(row.amount), 
      status: row.status, 
      date: row.date 
    });
    setShowFeeForm(true);
  };

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setFeeForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleFeeSubmit = async (e) => {
    e.preventDefault();
    if (!feeForm.student_name.trim() || !feeForm.course || !feeForm.amount || !feeForm.date) {
      alert("Please fill in all required fields: Student Name, Course, Amount, and Date");
      return;
    }
    try {
      const courseInt = parseInt(feeForm.course);
      if (isNaN(courseInt)) {
        alert("Please select a valid course");
        return;
      }
      const payload = { 
        ...feeForm, 
        course: courseInt 
      };
      if (editingFee) {
        await api.put(`/api/college/fees/${editingFee.id}/`, payload);
      } else {
        await api.post('/api/college/fees/', payload);
      }
      fetchData();
      setShowFeeForm(false);
      setEditingFee(null);
    } catch (err) {
      console.error("Error saving fee:", err);
      console.error("Error details:", err.response?.data);
      const errorMsg = err.response?.data?.course?.[0] || 
                       err.response?.data?.student_name?.[0] || 
                       err.response?.data?.amount?.[0] || 
                       "Error saving fee";
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleFeeDelete = async (id) => {
    if (!window.confirm("Delete this fee record?")) return;
    try {
      await api.delete(`/api/college/fees/${id}/`);
      fetchData();
    } catch (err) {
      console.error("Error deleting fee:", err);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </MainLayout>
    );
  }

  // ---------- Layout / theme ----------
  return (
    <MainLayout>
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-indigo-400">
              CampVerse module
            </p>
            <h1 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 bg-clip-text text-transparent">
              College Management
            </h1>
            <p className="mt-2 text-sm md:text-base text-slate-500 max-w-xl">
              Central dashboard for courses, faculty, timetable, attendance and
              fee management.
            </p>
          </div>


        </div>
      </motion.header>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        {dashboardStats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            whileHover={{ y: -4, scale: 1.03 }}
            className="group bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_18px_45px_rgba(15,23,42,0.12)] border border-slate-100 flex flex-col items-start gap-3"
          >
            <div
              className={`inline-flex h-11 w-11 rounded-2xl bg-gradient-to-br ${stat.color} items-center justify-center shadow-[0_10px_25px_rgba(79,70,229,0.45)] group-hover:scale-110 transition-transform`}
            >
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">
                {stat.title}
              </p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Layout: sidebar + main */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-[0_22px_60px_rgba(15,23,42,0.12)] border border-slate-100 h-fit"
        >
          <nav className="space-y-2 text-sm">
            {[
              { id: "dashboard", label: "Dashboard", emoji: "📊" },
              { id: "courses", label: "Courses", emoji: "📚" },
              { id: "faculty", label: "Faculty", emoji: "👨‍🏫" },
              { id: "timetable", label: "Timetable", emoji: "📅" },
              { id: "attendance", label: "Attendance", emoji: "📋" },
              { id: "fees", label: "Fees", emoji: "💰" },
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main content */}
        <motion.main
          initial={{ x: 16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_24px_70px_rgba(15,23,42,0.14)] border border-slate-100 min-h-[320px]"
        >
          <AnimatePresence mode="wait">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
                  📊 Dashboard overview
                </h2>
                
                {/* Quick Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-xs opacity-80">Today's Attendance</p>
                    <p className="text-2xl font-bold">94%</p>
                    <p className="text-xs opacity-70 mt-1">↑ 2% from yesterday</p>
                  </div>
                  <div className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-xs opacity-80">Total Students</p>
                    <p className="text-2xl font-bold">2,847</p>
                    <p className="text-xs opacity-70 mt-1">↑ 12 this month</p>
                  </div>
                  <div className="bg-gradient-to-br from-violet-400 to-violet-500 rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-xs opacity-80">Active Courses</p>
                    <p className="text-2xl font-bold">28</p>
                    <p className="text-xs opacity-70 mt-1">Across 5 depts</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
                    <p className="text-xs opacity-80">Faculty</p>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs opacity-70 mt-1">12 new this year</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Attendance Chart */}
                  <div className="rounded-3xl p-6 border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">
                      📈 Attendance This Week
                    </h3>
                    <div className="flex items-end justify-between h-40 gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => {
                        const heights = [85, 92, 78, 88, 94];
                        return (
                          <div key={day} className="flex flex-col items-center gap-2 flex-1">
                            <div 
                              className="w-full bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-t-lg transition-all hover:from-emerald-500 hover:to-emerald-400"
                              style={{ height: `${heights[i]}%` }}
                            />
                            <span className="text-xs text-slate-500">{day}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Fee Collection */}
                  <div className="rounded-3xl p-6 border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-purple-50">
                    <h3 className="text-sm font-semibold text-slate-800 mb-4">
                      💰 Fee Collection Status
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">Collected</span>
                          <span className="font-semibold text-emerald-600">₹18.5L (82%)</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-[82%] bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-600">Pending</span>
                          <span className="font-semibold text-orange-600">₹4.2L (18%)</span>
                        </div>
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full w-[18%] bg-gradient-to-r from-orange-400 to-orange-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Total Revenue</p>
                        <p className="text-lg font-bold text-slate-800">₹22.7L</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <p className="text-xs text-slate-500">Pending Dues</p>
                        <p className="text-lg font-bold text-orange-600">₹4.2L</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="mt-6 rounded-3xl p-6 border border-slate-100 bg-white">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">
                    📋 Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: '📚', text: 'New course "B.Tech AI" added', time: '2 hours ago' },
                      { icon: '👨‍🏫', text: 'Dr. Priya Singh joined as Faculty', time: '5 hours ago' },
                      { icon: '📋', text: 'Attendance marked for B.Tech CSE', time: '1 day ago' },
                      { icon: '💰', text: 'Fee payment received from Ankit Verma', time: '1 day ago' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-sm text-slate-700 flex-1">{item.text}</span>
                        <span className="text-xs text-slate-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Courses tab (same as previous answer but kept) */}
            {activeTab === "courses" && (
              <motion.div
                key="courses"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      📚 Courses
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500">
                      Manage programmes, credits, strength and yearly fees.
                    </p>
                  </div>
                  <button
                    onClick={openNewCourseForm}
                    className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs md:text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.7)] transition-all"
                  >
                    + Add course
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="p-4 text-left font-semibold">Course</th>
                        <th className="p-4 text-left font-semibold">Credits</th>
                        <th className="p-4 text-left font-semibold">Students</th>
                        <th className="p-4 text-left font-semibold">
                          Fees / year
                        </th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <motion.tr
                          key={course.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${
                            highlightCourseId === course.id
                              ? "bg-emerald-50/70"
                              : ""
                          }`}
                        >
                          <td className="p-4 font-semibold text-slate-900">
                            {course.name}
                          </td>
                          <td className="p-4 font-bold text-emerald-600">
                            {course.credits}
                          </td>
                          <td className="p-4 text-slate-700">
                            {course.students}
                          </td>
                          <td className="p-4 font-semibold text-indigo-600">
                            ₹{course.fees.toLocaleString("en-IN")}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditCourseForm(course)}
                                className="px-2 py-1 rounded-xl text-xs text-sky-600 hover:bg-sky-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleCourseDelete(course.id)}
                                className="px-2 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Course modal */}
                <AnimatePresence>
                  {showCourseForm && (
                    <motion.div
                      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {editingCourse ? "Edit course" : "Add new course"}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Update course name, credits, strength and fee.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowCourseForm(false);
                              setEditingCourse(null);
                            }}
                            className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <form
                          onSubmit={handleCourseSubmit}
                          className="px-5 py-4 space-y-3 text-sm"
                        >
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Course name
                            </label>
                            <input
                              name="name"
                              value={courseForm.name}
                              onChange={handleCourseChange}
                              type="text"
                              placeholder="e.g. B.Tech CSE"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Credits
                              </label>
                              <input
                                name="credits"
                                type="number"
                                min="1"
                                max="10"
                                value={courseForm.credits}
                                onChange={handleCourseChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Students
                              </label>
                              <input
                                name="students"
                                type="number"
                                min="0"
                                value={courseForm.students}
                                onChange={handleCourseChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Fees (₹ / year)
                              </label>
                              <input
                                name="fees"
                                type="number"
                                min="0"
                                value={courseForm.fees}
                                onChange={handleCourseChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowCourseForm(false);
                                setEditingCourse(null);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_34px_rgba(79,70,229,0.75)] transition-all"
                            >
                              {editingCourse ? "Save changes" : "Add course"}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Faculty tab */}
            {activeTab === "faculty" && (
              <motion.div
                key="faculty"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      👨‍🏫 Faculty
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500">
                      Maintain faculty directory with subjects and contact
                      details.
                    </p>
                  </div>
                  <button
                    onClick={openNewFacultyForm}
                    className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs md:text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.7)] transition-all"
                  >
                    + Add faculty
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="p-4 text-left font-semibold">Name</th>
                        <th className="p-4 text-left font-semibold">Subject</th>
                        <th className="p-4 text-left font-semibold">Dept</th>
                        <th className="p-4 text-left font-semibold">Phone</th>
                        <th className="p-4 text-left font-semibold">Email</th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faculty.map((f) => (
                        <motion.tr
                          key={f.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${
                            highlightFacultyId === f.id ? "bg-emerald-50/70" : ""
                          }`}
                        >
                          <td className="p-4 font-semibold text-slate-900">
                            {f.name}
                          </td>
                          <td className="p-4 text-slate-700">{f.subject}</td>
                          <td className="p-4 text-slate-700">{f.department || "-"}</td>
                          <td className="p-4 text-slate-700">{f.phone}</td>
                          <td className="p-4 text-slate-700">{f.email}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditFacultyForm(f)}
                                className="px-2 py-1 rounded-xl text-xs text-sky-600 hover:bg-sky-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleFacultyDelete(f.id)}
                                className="px-2 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <AnimatePresence>
                  {showFacultyForm && (
                    <motion.div
                      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {editingFaculty
                                ? "Edit faculty"
                                : "Add new faculty"}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Name, department, subject and contact info.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowFacultyForm(false);
                              setEditingFaculty(null);
                            }}
                            className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <form
                          onSubmit={handleFacultySubmit}
                          className="px-5 py-4 space-y-3 text-sm"
                        >
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Name
                            </label>
                            <input
                              name="name"
                              value={facultyForm.name}
                              onChange={handleFacultyChange}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Subject
                              </label>
                              <input
                                name="subject"
                                value={facultyForm.subject}
                                onChange={handleFacultyChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Department
                              </label>
                              <input
                                name="department"
                                value={facultyForm.department}
                                onChange={handleFacultyChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Phone
                              </label>
                              <input
                                name="phone"
                                value={facultyForm.phone}
                                onChange={handleFacultyChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Email
                              </label>
                              <input
                                name="email"
                                value={facultyForm.email}
                                onChange={handleFacultyChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowFacultyForm(false);
                                setEditingFaculty(null);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_34px_rgba(79,70,229,0.75)] transition-all"
                            >
                              {editingFaculty ? "Save changes" : "Add faculty"}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Timetable tab */}
            {activeTab === "timetable" && (
              <motion.div
                key="timetable"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      📅 Timetable
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500">
                      Day-wise slots mapped to courses, rooms and faculty.
                    </p>
                  </div>
                  <button
                    onClick={openNewTTForm}
                    className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs md:text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.7)] transition-all"
                  >
                    + Add slot
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="p-4 text-left font-semibold">Day</th>
                        <th className="p-4 text-left font-semibold">Slot</th>
                        <th className="p-4 text-left font-semibold">Course</th>
                        <th className="p-4 text-left font-semibold">Room</th>
                        <th className="p-4 text-left font-semibold">Faculty</th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timetable.map((r) => (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${
                            highlightTTId === r.id ? "bg-emerald-50/70" : ""
                          }`}
                        >
                          <td className="p-4 text-slate-800">{r.day}</td>
                          <td className="p-4 text-slate-800">{r.slot}</td>
                          <td className="p-4 text-slate-800">{r.course_name || r.course}</td>
                          <td className="p-4 text-slate-800">{r.room}</td>
                          <td className="p-4 text-slate-800">{r.faculty_name || "-"}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditTTForm(r)}
                                className="px-2 py-1 rounded-xl text-xs text-sky-600 hover:bg-sky-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleTTDelete(r.id)}
                                className="px-2 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <AnimatePresence>
                  {showTTForm && (
                    <motion.div
                      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {editingTT ? "Edit slot" : "Add timetable slot"}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Day, time slot, course, room and faculty.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowTTForm(false);
                              setEditingTT(null);
                            }}
                            className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <form
                          onSubmit={handleTTSubmit}
                          className="px-5 py-4 space-y-3 text-sm"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Day
                              </label>
                              <select
                                name="day"
                                value={ttForm.day}
                                onChange={handleTTChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              >
                                {[
                                  "Monday",
                                  "Tuesday",
                                  "Wednesday",
                                  "Thursday",
                                  "Friday",
                                  "Saturday",
                                ].map((d) => (
                                  <option key={d}>{d}</option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Slot
                              </label>
                              <input
                                name="slot"
                                value={ttForm.slot}
                                onChange={handleTTChange}
                                placeholder="09:00 - 10:00"
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Course
                            </label>
                            <select
                              name="course"
                              value={ttForm.course}
                              onChange={handleTTChange}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              required
                            >
                              <option value="">Select a course</option>
                              {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.name} (Credits: {course.credits})
                                </option>
                              ))}
                            </select>
                            {courses.length === 0 && (
                              <p className="text-xs text-orange-600 mt-1">
                                ⚠️ No courses available. Please add a course first.
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Room
                              </label>
                              <input
                                name="room"
                                value={ttForm.room}
                                onChange={handleTTChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Faculty
                              </label>
                              <select
                                name="faculty"
                                value={ttForm.faculty}
                                onChange={handleTTChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              >
                                <option value="">Select faculty (optional)</option>
                                {faculty.map((f) => (
                                  <option key={f.id} value={f.id}>
                                    {f.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowTTForm(false);
                                setEditingTT(null);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_34px_rgba(79,70,229,0.75)] transition-all"
                            >
                              {editingTT ? "Save changes" : "Add slot"}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Attendance tab */}
            {activeTab === "attendance" && (
              <motion.div
                key="attendance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      📋 Attendance log
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500">
                      Daily course-wise attendance summary.
                    </p>
                  </div>
                  <button
                    onClick={openNewAttForm}
                    className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs md:text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.7)] transition-all"
                  >
                    + Add record
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="p-4 text-left font-semibold">Date</th>
                        <th className="p-4 text-left font-semibold">Course</th>
                        <th className="p-4 text-left font-semibold">
                          Present / Total
                        </th>
                        <th className="p-4 text-left font-semibold">Status</th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance.map((r) => (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${
                            highlightAttId === r.id ? "bg-emerald-50/70" : ""
                          }`}
                        >
                          <td className="p-4 text-slate-800">{r.date}</td>
                          <td className="p-4 text-slate-800">{r.course}</td>
                          <td className="p-4 text-slate-800">
                            {r.present} / {r.total}
                          </td>
                          <td className="p-4 text-slate-800">{r.status}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditAttForm(r)}
                                className="px-2 py-1 rounded-xl text-xs text-sky-600 hover:bg-sky-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleAttDelete(r.id)}
                                className="px-2 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <AnimatePresence>
                  {showAttForm && (
                    <motion.div
                      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {editingAtt
                                ? "Edit attendance"
                                : "Add attendance record"}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Date, course and present / total strength.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowAttForm(false);
                              setEditingAtt(null);
                            }}
                            className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <form
                          onSubmit={handleAttSubmit}
                          className="px-5 py-4 space-y-3 text-sm"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Date
                              </label>
                              <input
                                type="date"
                                name="date"
                                value={attForm.date}
                                onChange={handleAttChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Course
                              </label>
                              <select
                                name="course"
                                value={attForm.course}
                                onChange={handleAttChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                                required
                              >
                                <option value="">Select a course</option>
                                {courses.map((course) => (
                                  <option key={course.id} value={course.id}>
                                    {course.name}
                                  </option>
                                ))}
                              </select>
                              {courses.length === 0 && (
                                <p className="text-xs text-orange-600 mt-1">
                                  ⚠️ No courses available. Please add a course first.
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Present
                              </label>
                              <input
                                type="number"
                                name="present"
                                min="0"
                                value={attForm.present}
                                onChange={handleAttChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Total
                              </label>
                              <input
                                type="number"
                                name="total"
                                min="0"
                                value={attForm.total}
                                onChange={handleAttChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Status
                              </label>
                              <select
                                name="status"
                                value={attForm.status}
                                onChange={handleAttChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              >
                                <option>Good</option>
                                <option>Average</option>
                                <option>Poor</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowAttForm(false);
                                setEditingAtt(null);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_34px_rgba(79,70,229,0.75)] transition-all"
                            >
                              {editingAtt ? "Save changes" : "Add record"}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Fees tab */}
            {activeTab === "fees" && (
              <motion.div
                key="fees"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      💰 Fees
                    </h2>
                    <p className="text-xs md:text-sm text-slate-500">
                      Track student-wise fee payments and pending dues.
                    </p>
                  </div>
                  <button
                    onClick={openNewFeeForm}
                    className="px-5 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs md:text-sm font-semibold text-white shadow-[0_12px_32px_rgba(79,70,229,0.55)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.7)] transition-all"
                  >
                    + Add fee record
                  </button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-100 bg-white">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="p-4 text-left font-semibold">
                          Student
                        </th>
                        <th className="p-4 text-left font-semibold">Course</th>
                        <th className="p-4 text-left font-semibold">Amount</th>
                        <th className="p-4 text-left font-semibold">Status</th>
                        <th className="p-4 text-left font-semibold">Date</th>
                        <th className="p-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.map((r) => (
                        <motion.tr
                          key={r.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`border-b border-slate-50 last:border-0 hover:bg-slate-50/70 transition-colors ${
                            highlightFeeId === r.id ? "bg-emerald-50/70" : ""
                          }`}
                        >
                          <td className="p-4 text-slate-800">{r.student_name || "-"}</td>
                          <td className="p-4 text-slate-800">{r.course_name || r.course || "-"}</td>
                          <td className="p-4 font-semibold text-indigo-600">
                            ₹{r.amount.toLocaleString("en-IN")}
                          </td>
                          <td className="p-4 text-slate-800">{r.status}</td>
                          <td className="p-4 text-slate-800">{r.date}</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditFeeForm(r)}
                                className="px-2 py-1 rounded-xl text-xs text-sky-600 hover:bg-sky-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleFeeDelete(r.id)}
                                className="px-2 py-1 rounded-xl text-xs text-rose-600 hover:bg-rose-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <AnimatePresence>
                  {showFeeForm && (
                    <motion.div
                      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 40, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_60px_rgba(15,23,42,0.35)] border border-slate-100"
                      >
                        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">
                              {editingFee ? "Edit fee record" : "Add fee record"}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Student, course, amount and payment status.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setShowFeeForm(false);
                              setEditingFee(null);
                            }}
                            className="h-8 w-8 rounded-full bg-slate-100 text-slate-500 text-xs flex items-center justify-center hover:bg-slate-200"
                          >
                            ✕
                          </button>
                        </div>

                        <form
                          onSubmit={handleFeeSubmit}
                          className="px-5 py-4 space-y-3 text-sm"
                        >
                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Student name
                            </label>
                            <input
                              name="student_name"
                              value={feeForm.student_name}
                              onChange={handleFeeChange}
                              placeholder="e.g. Rahul Kumar"
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Course
                            </label>
                            <select
                              name="course"
                              value={feeForm.course}
                              onChange={handleFeeChange}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              required
                            >
                              <option value="">Select a course</option>
                              {courses.map((course) => (
                                <option key={course.id} value={course.id}>
                                  {course.name}
                                </option>
                              ))}
                            </select>
                            {courses.length === 0 && (
                              <p className="text-xs text-orange-600 mt-1">
                                ⚠️ No courses available. Please add a course first.
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Amount (₹)
                              </label>
                              <input
                                type="number"
                                name="amount"
                                min="0"
                                value={feeForm.amount}
                                onChange={handleFeeChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-slate-600">
                                Status
                              </label>
                              <select
                                name="status"
                                value={feeForm.status}
                                onChange={handleFeeChange}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                              >
                                <option>Paid</option>
                                <option>Pending</option>
                                <option>Partially Paid</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-600">
                              Payment / due date
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={feeForm.date}
                              onChange={handleFeeChange}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/70"
                            />
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setShowFeeForm(false);
                                setEditingFee(null);
                              }}
                              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-xs font-semibold text-white shadow-[0_10px_26px_rgba(79,70,229,0.6)] hover:shadow-[0_14px_34px_rgba(79,70,229,0.75)] transition-all"
                            >
                              {editingFee ? "Save changes" : "Add record"}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
    </MainLayout>
  );
};

export default CollegeManagement;


