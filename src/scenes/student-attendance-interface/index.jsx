import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import "./style.css";
import FormHelperText from "@mui/material/FormHelperText";
import studentAttendanceService, {
  getStudent,
  markAttendance,
} from "../../services/studentAttendanceService";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const studentAttendanceKey = "studentAttendanceKey";
const studentNameKey = "studentName";
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("required")
    .matches(
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
      "Invalid email format: Enter a valid specific email address"
    )
    .trim(),
  pcId: yup
    .string()
    .required("required")
    .matches(
      /^.{7}$/,
      "Invalid PC Id format: Enter a valid specific PC Id (ex:PC50101)"
    )
    .trim(),
});

const initialValues = {
  email: "",
  pcId: "",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [pcId, setPcId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let timeOut = null;
  const handleAttendanceMark = async () => {
    try {
      const data = {
        email: email.toLowerCase(),
        pcId: pcId.toLocaleUpperCase(),
      };
      const response = await markAttendance(data);
      const attendanceKey = response.data.retunValue;


      if (response.data.o_sql_msg === "success") {
        localStorage.setItem(studentAttendanceKey, attendanceKey);
        localStorage.setItem(studentNameKey, studentName);
        window.location = "/";
      } else if (
        response.data.o_sql_msg === "STUDENT ALREADY INSERTED LOGIN TIME"
      ) {
        toast.error("This user is already logged in");
      }
      else if (
        response.data.o_sql_msg === "INVALID PC CODE"
      ) {
        toast.error("Error: Invalid PC ID. Please check PC ID and try again.");
      }
    } catch (error) {
      // console.error("Error marking attendance:", error);
      // if (error.response) {
      //   // Handle response errors (if any)
      //   if (error.response.status >= 400 && error.response.status < 500) {
      //     toast.warn("An error occurred. Please try again.");
      //   } else {
      //     toast.error("An unexpected server error occurred.");
      //   }
      // } else if (error.request) {
      //   // Handle request errors
      //   toast.error("Request error. Please check your network connection.");
      // } else {
      //   // Handle other errors
      //   toast.error("An unexpected error occurred.");
      // }
    }
  };
  // useEffect(() => {
  //   timeOut =
  //     autoPlay &&
  //     setTimeout(() => {
  //       slideRight();
  //     }, 10000000);
  // });

  const slideRight = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  const slideLeft = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  return (
    <div
      className="carousel"
      onMouseEnter={() => {
        setAutoPlay(false);
        clearTimeout(timeOut);
      }}
      onMouseLeave={() => {
        setAutoPlay(true);
      }}
    >
      <div className="carousel_wrapper">
        {images.map((image, index) => {
          return (
            /* (condition) ? true : false */

            <div
              key={index}
              className={
                index == current
                  ? "carousel_card carousel_card-active"
                  : "carousel_card"
              }
            >
              <img className="card_image" src={image.image} alt="" />
              <div className="card_overlay">
                <Box display="flex">
                  <a href="/register">
                    <Button
                      variant="contained"
                      type="submit"
                      style={{
                        top: 0,
                        position: "absolute",
                        backgroundColor: "red",
                        fontSize: "15px",
                        marginBottom: "10px",
                        marginTop: "10px",
                        width: "170px",
                      }}
                    >
                      Student Register
                    </Button>
                  </a>
                  <a href="/login">
                    <IconButton
                      aria-label="delete"
                      variant="contained"
                      type="submit"
                      style={{
                        top: 0,
                        right: 0,
                        position: "absolute",
                      }}
                      size="large"
                    >
                      <LoginOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </a>
                </Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h2"
                      component="h2"
                    >
                      HELLO.. {studentName}
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      variant="h3"
                      sx={{ mt: 2 }}
                    >
                      Welcome to DP Coding
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      marginTop="10px"
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        onClick={handleAttendanceMark}
                        style={{
                          backgroundColor: "red",
                          fontSize: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        It's me
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        style={{
                          backgroundColor: "white",
                          fontSize: "15px",
                          marginBottom: "10px",
                          color: "red",
                        }}
                        onClick={handleClose}
                      >
                        Not me
                      </Button>
                    </Box>
                  </Box>
                </Modal>
                <Formik
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    try {
                      const response = await getStudent(values.email);

                      setStudentName(response.data.studentName);
                      setPcId(values.pcId);
                      setEmail(values.email);

                         
                      if (response.data.sql_msg === "SUCCESS") {
                        handleOpen();
                      }
                      else{
                        toast.error("Error: Invalid email. Please check your credentials and try again.")
                      }
                    } catch (ex) {

                    }
                  }}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box
                        display="-ms-flexbox"
                        alignItems="center"
                        marginTop="250px"
                        justifyContent="center"
                        sx={{ backgroundColor: "rgba(211, 205, 208, 0.353)" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "25px",
                            textAlign: "center",
                            paddingTop: "15px",
                          }}
                        >
                          Attendance Marking Form
                        </Typography>
                        <TextField
                          name="email"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Enter your outlook email address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          autoFocus={false}
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{
                            mt: "15px",
                            mb: "15px",
                            color: "black",
                            fontSize: "50px",
                            padding: "10px",
                          }}
                        />
                        <TextField
                          name="pcId"
                          fullWidth
                          variant="filled"
                          type="text"
                          label="Enter your pc id"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.pcId}
                          autoFocus={false}
                          error={!!touched.pcId && !!errors.pcId}
                          helperText={touched.pcId && errors.pcId}
                          sx={{ padding: "10px" }}
                        />
                        <Box
                          marginTop="10px"
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            variant="contained"
                            type="submit"
                            style={{
                              backgroundColor: "red",
                              fontSize: "15px",
                              marginBottom: "10px",
                            }}
                          >
                            Let's Code
                          </Button>
                        </Box>
                      </Box>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
