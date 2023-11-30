import { useState } from "react";
import Topbar from "./scenes/global/Topbar";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SidebarComponent from "./scenes/global/Sidebar";

import SignInSide from "./scenes/login/login";
import StudentAttendanceInterface from "./scenes/student-attendance-interface";
import Carousel from "./scenes/student-attendance-interface";
import { countries } from "./scenes/student-attendance-interface/data";
import HomeComponent from "./scenes/student-attendance-interface/homeComponent";

import { Route, Router, Routes } from "react-router-dom";
import StudentAttendance from "./scenes/studentAttendance";
import Team from "./scenes/table/table";
import Register from "./scenes/register";
import TopPerformance from "./scenes/table/table";
import { ToastContainer } from "react-toastify";
import LoginLayout from "./Layouts/LoginLayout";
import HomeLayout from "./Layouts/HomeLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import ExecutiveLevelDashboard from "./scenes/execative-level-dashboard";
import Notfound from "./scenes/NotFound/Notfound";
import ProtectedRoute from "./components/ProtectedRoute";
import CenterInchargeDashboard from "./scenes/center-incharge-dashboard";
import Test from "./Layouts/Test";
import CenterManagerDashboardLayout from "./Layouts/CenterInchargeDashboard";
import ViewAllStudents from "./scenes/center-incharge-dashboard/view-all-students";
import DailyStudentOverview from "./scenes/center-incharge-dashboard/daily-student-overview";
import PCPerformanceStats from "./scenes/center-incharge-dashboard/pc-perfomance";
import UploadFiles from "./scenes/center-incharge-dashboard/upload-files";
import PCWorkHours from "./scenes/execative-level-dashboard/pc-work-hours";
import DpStaffDashboardLayout from "./Layouts/DPStaffDashboard";
import StaffDashboard from "./scenes/staff-dashboard/dashboard";
import AddCenter from "./scenes/staff-dashboard/add-center";
import AddCenterManager from "./scenes/staff-dashboard/add-center-manager";

function App() {
  const [theme, colorMode] = useMode();
  const images = [
    "../../assets/bg.jpg",
    "../../assets/2.jpg",
    "../../assets/3.jpg",
    // Add more image URLs as needed
  ];
  const role = localStorage.getItem("Role");

  const user = {
    id: "1",
    roles: role ?? [],
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <main className="content">
            <Routes>
              <Route index element={<HomeLayout />} />
              <Route path="/" element={<HomeLayout />}>
                <Route
                  path="/"
                  element={<HomeComponent images={countries} />}
                />
                <Route path="register" element={<Register />} />
              </Route>
              <Route path="/login" element={<LoginLayout />} />

              <Route
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("ADM")}
                  />
                }
              >
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route
                    path="executive2"
                    element={<ExecutiveLevelDashboard />}
                  />
                  <Route
                    path="student-attendance"
                    element={<StudentAttendance />}
                  />
                  <Route path="top-performance" element={<TopPerformance />} />
                  <Route path="pc-performance" element={<PCWorkHours />} />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("CIC")}
                  />
                }
              >
                <Route
                  path="/staff-dashboard"
                  element={<CenterManagerDashboardLayout />}
                >
                  <Route
                    path="center-manager"
                    element={<CenterInchargeDashboard />}
                  />
                  <Route path="view-all" element={<ViewAllStudents />} />
                  <Route
                    path="today-students"
                    element={<DailyStudentOverview />}
                  />
                  <Route path="pc-stats" element={<PCPerformanceStats />} />
                  <Route path="file-upload" element={<UploadFiles />} />
                </Route>
              </Route>
              <Route
                element={
                  <ProtectedRoute
                    isAllowed={!!user && user.roles.includes("DPS")}
                  />
                }
              >
                <Route
                  path="/dp-staff-dashboard"
                  element={<DpStaffDashboardLayout />}
                >
                  <Route path="staff" element={<ExecutiveLevelDashboard />} />
                  <Route
                    path="student-attendance"
                    element={<StudentAttendance />}
                  />
                  <Route
                    path="add-center"
                    element={<AddCenter />}
                  />
                  <Route
                    path="add-center-manager"
                    element={<AddCenterManager />}
                  />
                </Route>
              </Route>
              <Route path="*" element={<Notfound />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
