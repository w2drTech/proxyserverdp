import { Route, Routes } from "react-router-dom";
import ExecutiveLevelDashboard from "../scenes/execative-level-dashboard";
import SidebarComponent from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import StudentAttendance from "../scenes/studentAttendance";
import TopPerformance from "../scenes/table/table";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChecklistRtlOutlinedIcon from "@mui/icons-material/ChecklistRtlOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import FileOpenOutlinedIcon from "@mui/icons-material/FileOpenOutlined";
import RuleOutlinedIcon from "@mui/icons-material/RuleOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import Notfound from "../scenes/NotFound/Notfound";
import PCWorkHours from "../scenes/execative-level-dashboard/pc-work-hours";

const menuItems = [
  {
    title: "Dashboard",
    to: "executive2",
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
];

const DashboardLayout = () => {
  return (
    <div className="app">
      <SidebarComponent menuItems={menuItems} />
      <main className="content">
        <Topbar />

        <Routes>
          <Route
            path="/executive2"
            exact
            element={<ExecutiveLevelDashboard />}
          />
          <Route path="/student-attendance" element={<StudentAttendance />} />
          <Route path="/top-performance" element={<TopPerformance />} />
          <Route path="/pc-performance" element={<PCWorkHours />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;
