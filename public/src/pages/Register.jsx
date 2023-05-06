import React, { useState,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { registerRoute } from "../utils/apiRoutes";

function Register() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/chat");
    }
  }, []);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const toastOptions = {
    autoClose: 3000,
    position: toast.POSITION.BOTTOM_RIGHT,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { formIsValid, errors } = handleValidation();
    if (formIsValid) {
      const { email, password, name } = values;
      const { data } = await axios.post(registerRoute, {
        email,
        password,
        name,
      });
      console.log(data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/chat");
      } else {
        toast.error(data.message, toastOptions);
      }
    } else {
      //loop through errors
      Object.keys(errors).forEach((key) => {
        toast.error(key + " " + errors[key], toastOptions);
        // console.log(key + errors[key]);
      });

      //   console.log(errors);
    }
  };
  const handlechange = (event) => {
    console.log(event.target.name);
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!values.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }
    if (!values.password) {
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }
    if (!values.name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }
    return { formIsValid, errors };
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-dark text-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "400px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
              <p className="text-white-50 mb-5">Please enter your details</p>
              <form
                className="mb-4 mx-5 w-100 "
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <MDBInput
                  wrapperClass="mb-4  w-100"
                  labelClass="text-white"
                  label="Email address"
                  id="formControlLg"
                  name="email"
                  type="email"
                  size="lg"
                  onChange={(e) => {
                    handlechange(e);
                  }}
                />
                <MDBInput
                  name="name"
                  wrapperClass="mb-4  w-100"
                  labelClass="text-white"
                  label="Full Name"
                  id="formControlLg"
                  type="text"
                  size="lg"
                  onChange={(e) => {
                    handlechange(e);
                  }}
                />
                <MDBInput
                  name="password"
                  wrapperClass="mb-4  w-100"
                  labelClass="text-white"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  onChange={(e) => {
                    handlechange(e);
                  }}
                  size="lg"
                />
                <div className="text-center">
                  <MDBBtn
                    outline
                    type="submit"
                    className="mx-2 px-5 text-center"
                    style={{ color: "white" }}
                    color="white"
                    size="lg"
                  >
                    Sign Up
                  </MDBBtn>
                </div>
              </form>

              <br></br>

              <div>
                <p className="mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-white-50 fw-bold">
                    Login
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}

export default Register;
