import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";

import LineChart from "../../components/LineChart";
import { toast } from "react-toastify";
import { getProvinces } from "../../services/areaService";
import { getDistricts } from "../../services/districtService";
import { getCenters } from "../../services/centerService";
import { getExecutiveDashboardLineChartData } from "../../services/lineChartDataService";
import "../../../src/style.css";
import StatBox from "../../components/StatBox";
import {
  getSelectedProvinceAttendance,
  getSelectedProvinceAttendanceForCircle,
} from "../../services/getDistrictAttendance";
import { getStatBoxData } from "../../services/statboxDataService";
import { getSelectedDistrictAttendance, getSelectedDistrictAttendanceForCircle } from "../../services/getCenterAttendanceForSelectedDistrict";
import {
  getSelectedCenterAttendance,
  getSelectedCenterAttendanceForCircle,
} from "../../services/getCenterAttendanceDetails";

const StudentAttendance = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [centers, setCenters] = useState([]);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [center, setCenter] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  var [loading, setLoading] = useState(true);
  const [lineChartData, setLineChartData] = useState([]);
  const [allStudents, setAllStudents] = useState("");
  const [todayStudents, setTodayStudents] = useState("");
  const [currentStudents, setCurrentStudents] = useState("");

  const handleProvinceChange = async (event) => {
    setProvince(event.target.value);

    const responseOfCircleData = await getSelectedProvinceAttendanceForCircle(
      event.target.value
    );
    setAllStudents(responseOfCircleData.data.allStudentCount);
    setTodayStudents(responseOfCircleData.data.todayStudentCount);
    setCurrentStudents(responseOfCircleData.data.currentStudentCount);
    const response = await getSelectedProvinceAttendance(event.target.value);
    const districtArrays = {};
    // const districtColors = {
    //   COLOMBO: tokens("dark").greenAccent[500],
    //   GAMPAHA: tokens("dark").blueAccent[500],
    //   KALUTARA: tokens("dark").redAccent[500],
    //   // Add more districts and colors as needed
    // };
    response.data.forEach((item) => {
      const district = item.district;

      if (!districtArrays[district]) {
        districtArrays[district] = {
          id: district.toLowerCase(), // Convert district name to lowercase for the id
          color: tokens("dark").greenAccent[500], // Function to get a random HSL color
          data: [],
        };
      } // Push the current item to the corresponding district array
      districtArrays[district].data.push({
        x: item.date,
        y: item.studentCount,
      });
    });
    const uniqueDistrictIDs = Object.keys(districtArrays);

    // Define an array of colors for each district dynamically
    const districtColors = {};
    uniqueDistrictIDs.forEach((districtID, index) => {
        districtColors[districtID] = tokens("dark").greenAccent[500 + index * 100];
        // Adjust the color generation as needed
    });
    
    // Function to generate a random HSL color
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
    }
    
    // Use districtColors for each district array in districtArrays
    Object.values(districtArrays).forEach(district => {
        district.color = districtColors[district.id] || getRandomColor();
    });
    // Convert the object to an array of values
    const resultArray = Object.values(districtArrays);
    setLineChartData(resultArray);
  };
  const handleDistrictChange = async (event) => {
    setDistrict(event.target.value);
    const responseOfCircleData = await getSelectedDistrictAttendanceForCircle(
      event.target.value
    );
    setAllStudents(responseOfCircleData.data.allStudentCount);
    setTodayStudents(responseOfCircleData.data.todayStudentCount);
    setCurrentStudents(responseOfCircleData.data.currentStudentCount);
    const response = await getSelectedDistrictAttendance(event.target.value);
    const centersArray = {};
    // const districtColors = {
    //   COLOMBO: tokens("dark").greenAccent[500],
    //   GAMPAHA: tokens("dark").blueAccent[500],
    //   KALUTARA: tokens("dark").redAccent[500],
    //   // Add more districts and colors as needed
    // };
    response.data.forEach((item) => {
      const center = item.centerName;

      if (!centersArray[center]) {
        centersArray[center] = {
          id: center.toLowerCase(), // Convert center name to lowercase for the id
          color: tokens("dark").greenAccent[500], // Function to get a random HSL color
          data: [],
        };
      } // Push the current item to the corresponding center array
      centersArray[center].data.push({
        x: item.date,
        y: item.studentCount,
      });
    });
    const uniqueDistrictIDs = Object.keys(centersArray);

    // Define an array of colors for each district dynamically
    const districtColors = {};
    uniqueDistrictIDs.forEach((districtID, index) => {
        districtColors[districtID] = tokens("dark").greenAccent[500 + index * 100];
        // Adjust the color generation as needed
    });
    
    // Function to generate a random HSL color
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 50%)`;
    }
    
    // Use districtColors for each district array in districtArrays
    Object.values(centersArray).forEach(district => {
        district.color = districtColors[district.id] || getRandomColor();
    });
    // Convert the object to an array of values
    const resultArray = Object.values(centersArray);
    setLineChartData(resultArray);
  };
  const handleCenterChange = async (event) => {
    setCenter(event.target.value);
    const responseOfCircleData = await getSelectedCenterAttendanceForCircle(
      event.target.value
    );
    setAllStudents(responseOfCircleData.data.allStudentCount);
    setTodayStudents(responseOfCircleData.data.todayStudentCount);
    setCurrentStudents(responseOfCircleData.data.currentStudentCount);

    const response = await getSelectedCenterAttendance(event.target.value);
    const chartDataForCenter = [
      {
        id: "Total Students",
        color: tokens("dark").greenAccent[500],
        data: response.data,
      },
    ];
    setLineChartData(chartDataForCenter);
  };
  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await getStatBoxData();
        setAllStudents(response.data.allStudentCount);
        setTodayStudents(response.data.dailyStudentCount);
        setCurrentStudents(response.data.currentStudentCount);

        const lineChartDataResponse =
          await getExecutiveDashboardLineChartData();
        const chartData = [
          {
            id: "Total Students",
            color: tokens("dark").greenAccent[500],
            data: lineChartDataResponse.data,
          },
        ];

        setLineChartData(chartData);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchLineChartData().then(() => setLoading((loading = false)));
  }, []);
  useEffect(() => {
    const fetchProvinceData = async () => {
      try {
        const response = await getProvinces();
        setProvinces(response.data);
      } catch (error) {
        toast.error("Error fetching data");
      }
    };
    fetchProvinceData();
  }, []);
  useEffect(() => {
    const fetchDistrictData = async () => {
      if (selectedProvince) {
        try {
          const response = await getDistricts(selectedProvince); // You'll need a function to fetch districts based on the selected province
          setDistricts(response.data); // Assuming response is an array of districts
        } catch (error) {
          toast.error("Error fetching data");
        }
      }
    };

    fetchDistrictData();
  }, [selectedProvince]);
  useEffect(() => {
    const fetchCenterData = async () => {
      if (selectedProvince) {
        try {
          const response = await getCenters(selectedDistrict); // You'll need a function to fetch districts based on the selected province
          setCenters(response.data); // Assuming response is an array of districts
        } catch (error) {
          toast.error("Error fetching data");
        }
      }
    };

    fetchCenterData();
  }, [selectedDistrict]);
  if (loading) {
    return <div id="cover-spin"></div>;
  }
  return (
    <Box m="0 20px">
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="70px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="province">Province</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="province"
                name="province"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  setSelectedProvince(e.target.value); // Update selected province when changed
                  handleProvinceChange(e); // Handle other form changes
                }}
              >
                {provinces.map((province) => (
                  <MenuItem
                    key={province.provinceId}
                    value={province.provinceId}
                  >
                    {province.provinceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="district">District</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="district"
                name="district"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  setSelectedDistrict(e.target.value); // Update selected province when changed
                  handleDistrictChange(e); // Handle other form changes
                }}
              >
                {districts.map((district) => (
                  <MenuItem
                    key={district.districtId}
                    value={district.districtId}
                  >
                    {district.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel id="center">Center</InputLabel>
              <Select
                variant="filled"
                fullWidth
                id="center"
                name="center"
                type="text"
                defaultValue=""
                required
                onChange={(e) => {
                  handleCenterChange(e); // Handle other form changes
                }}
              >
                {centers.map((center) => (
                  <MenuItem key={center.centerCode} value={center.centerCode}>
                    {center.centerName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        display="grid"
        justifyContent="space-between"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        mt="10px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 5"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            name="todayStudent"
            title="Today Students"
            progress={`${(todayStudents / allStudents) * 100 || 0.0}`}
            value={todayStudents}
            fullStudentValue={allStudents}
          />
        </Box>
        <Box
          gridColumn="span 5"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            name="todayStudent"
            title="Live Working Students"
            progress={`${(currentStudents / todayStudents) * 100 || 0.0}`}
            value={currentStudents}
            fullStudentValue={todayStudents}
          />
        </Box>
        <Box
          gridColumn="span 1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 12"
          height="490px"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box height="520px" m="-20px 0 0 0">
            <LineChart
              isDashboard={true}
              data={lineChartData}
              leftAxisName="Student Count"
              bottomAxisName="Date"
              area={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentAttendance;
/*        
<Box
gridColumn="span 3"
backgroundColor={colors.primary[400]}
display="flex"
alignItems="center"
justifyContent="center"
>
<StatBox
  name="todayStudent"
  title="Today Students"
  progress="0.75"
  //progress={`${(todayStudent / allRegisteredStudents) * 100}`}
 // value={todayStudent}
 // fullStudentValue={allRegisteredStudents}
/>
</Box>
<Box
gridColumn="span 3"
backgroundColor={colors.primary[400]}
display="flex"
alignItems="center"
justifyContent="center"
>
<StatBox
  name="liveStudent"
  title="Live Working Students"
  //progress={`${(workingStudent / allRegisteredStudents) * 100}`}
  //value={workingStudent}
  //fullStudentValue={allRegisteredStudents}
/>
</Box>
<Box
gridColumn="span 3"
backgroundColor={colors.primary[400]}
display="flex"
alignItems="center"
justifyContent="center"
>
<StatBox
  name="liveCenters"
  title="Live Working Centers"
  //progress={`${(workingCenters / allRegisteredCenters) * 100}`}
  //value={workingCenters}
  //fullStudentValue={allRegisteredCenters}
/>
</Box>
<Box
gridColumn="span 3"
backgroundColor={colors.primary[400]}
display="flex"
alignItems="center"
justifyContent="center"
>
<StatBox
  name="computerHours"
  title="Today Computer Hours"
  //progress="0.30"
  //value={computerHour}
/>
</Box>*/
