import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notfound from "../scenes/NotFound/Notfound";

import StaffDashboard from "../scenes/staff-dashboard/dashboard";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import StudentAttendance from "../scenes/studentAttendance";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddCenter from "../scenes/staff-dashboard/add-center";
import AddCenterManager from "../scenes/staff-dashboard/add-center-manager";
const DpStaffDashboardLayout = () => {
  const menuItems = [
    {
      title: "Dashboard",
      to: "staff",
      icon: <HomeOutlinedIcon />,
    },
    {
      title: "Center Details",
      icon: <SchoolOutlinedIcon />,
      subItems: [
        {
          title: "Attendance Mapping",
          to: "student-attendance",
          icon: <HowToRegOutlinedIcon />,
        },
        {
          title: "Work Hours Analysis: PCs",
          to: "pc-performance",
          icon: <ComputerOutlinedIcon />,
        },
      ],
    },
    // {
    //   title: "Project Tracking",
    //   icon: <ChecklistRtlOutlinedIcon />,
    //   subItems: [
    //     {
    //       title: "Opened Projects",
    //       to: "",
    //       icon: <FileOpenOutlinedIcon />,
    //     },
    //     {
    //       title: "Completed Projects",
    //       to: "",
    //       icon: <RuleOutlinedIcon />,
    //     },
    //   ],
    // },
    // {
    //   title: "Top Performance Centers",
    //   to: "top-performance",
    //   icon: <TrendingUpOutlinedIcon />,
    // },
    {
      title: "Center Management",
      icon: <SchoolOutlinedIcon />,
      subItems: [
        {
          title: "Add Computer Center",
          to: "add-center",
          icon: <AddLocationIcon />,
        },
        {
          title: "Add Center Manager",
          to: "add-center-manager",
          icon: <GroupAddIcon />,
        },
      ],
    },
  ];

  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} />
      <main className="content">
        <Topbar />

        <Routes>
          <Route path="/staff" exact element={<StaffDashboard />} />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/add-center" element={<AddCenter />} />
          <Route path="add-center-manager" element={<AddCenterManager />} />
          {/* <Route path="/view-all" element={<ViewAllStudents />} />
          <Route path="/today-students" element={<DailyStudentOverview />} />
          <Route path="/pc-stats" element={<PCPerformanceStats />} />
          <Route path="/file-upload" element={<UploadFiles />} /> */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default DpStaffDashboardLayout;
