import {
  Alert,
  Avatar,
  Button,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  paperStyle,
  btnStyle,
  avatarStyle,
  registerLinkStyle,
} from "./LoginStyle";
import Loader from "./Loader";
import "./LoginStyles.css";
import axios from "axios";

const Login1 = () => {
  //   email field validations
  const [value, setValue] = useState({
    email: "",
    emailError: false,
    emailErrorMessage: "",
  });

  const userNameOnchangeHandler = (e) => {
    if (/^\w+([-]?\.\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setValue({
        email: e.target.value,
      });
    } else if (e.target.value.trim().length === 0) {
      setValue({
        email: e.target.value,
      });
    } else {
      setValue({
        ...value,
        email: e.target.value,
        emailError: true,
        emailErrorMessage: "Email not valid!",
      });
    }
  };

  //   Password field validations
  const [passwordValue, setPasswordValue] = useState({
    password: "",
    passwordError: false,
    passwordErrorMessage: "",
  });

  const passwordOnChangeHandler = (e) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (passwordRegex.test(e.target.value)) {
      setPasswordValue({
        password: e.target.value,
      });
    } else if (e.target.value.trim().length === 0) {
      setPasswordValue({
        password: e.target.value,
      });
    } else {
      setPasswordValue({
        password: e.target.value,
        passwordError: true,
        passwordErrorMessage: "Password is not Valid!",
      });
    }
  };

  // Disable submit button
  const [disbleBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (
      value.email === "" ||
      passwordValue.password === "" ||
      value.emailError === true ||
      passwordValue.passwordError === true
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [
    value.email,
    passwordValue.password,
    passwordValue.passwordError,
    value.emailError,
  ]);

  // After Submit navigate to the hit submit.
  const [openLoader, setOpenLoader] = useState(false);
  const navigate = useNavigate();

  // Axios API call for login.
  const submitLoginHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/login", {
        email: value.email,
        password: passwordValue.password,
      })
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("username", value.email);
        sessionStorage.setItem("password", passwordValue.password);
        setOpenLoader(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
        if (err) {
          console.log(err);
          setOpenLoader(true);
          setTimeout(() => {
            setLoginError(
              "Login Failed, Please Check username and password Once."
            );
            setOpen(true);
            setOpenLoader(false);
          }, 2000);
        }
      });
  };

  // Snackbar Login Error
  const [loginError, setLoginError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="LoginWrapper">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign In</h2>
          </Grid>
          <form>
            <TextField
              type="email"
              label="Username"
              placeholder="Enter Email"
              fullWidth
              margin="normal"
              onChange={userNameOnchangeHandler}
              error={value.emailError}
              helperText={value.emailErrorMessage}
              autoComplete="off"
              required
            />
            <TextField
              type="password"
              label="Password"
              placeholder="Enter Password"
              onChange={passwordOnChangeHandler}
              error={passwordValue.passwordError}
              helperText={passwordValue.passwordErrorMessage}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              style={btnStyle}
              onClick={submitLoginHandler}
              disabled={disbleBtn}
              fullWidth
            >
              Sign In
            </Button>
          </form>
          <Typography style={registerLinkStyle}>
            Do you have Account?&nbsp;
            <Link href="/register">Sign Up</Link>
          </Typography>
        </Paper>

        {/* Snackbar */}
        {loginError && (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message={loginError}
          >
            <Alert onClose={handleClose} severity="error" variant="filled">
              {loginError}
            </Alert>
          </Snackbar>
        )}
        {openLoader && <Loader />}
      </Grid>
    </div>
  );
};

export default Login1;
