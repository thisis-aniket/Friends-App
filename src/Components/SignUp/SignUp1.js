import {
  Alert,
  Avatar,
  Button,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useNavigate } from "react-router";
import {
  paperStyle,
  avatarStyle,
  formStyle,
  btnStyle,
  loginLinkStyle,
} from "./signUpStyle";
import "./SignupStyle.css";
import axios from "axios";
import Loader from "../Login/Loader";

const SignUp1 = () => {
  //  Email Textfield validation
  const [emailValue, setEmailValue] = useState({
    email: "",
    emailError: false,
    emailErrorMessage: "",
  });

  const emailRegex = /^\w+([-]?\.\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const userNameOnchangeHandler = (e) => {
    if (emailRegex.test(e.target.value) === false) {
      setEmailValue({
        ...emailValue,
        email: e.target.value,
        emailError: true,
        emailErrorMessage: "Email is not valid!",
      });
    } else {
      setEmailValue({
        ...emailValue,
        email: e.target.value,
        emailError: false,
        emailErrorMessage: "",
      });
    }

    if (e.target.value.trim().length === 0) {
      setEmailValue({
        ...emailValue,
        email: e.target.value,
        emailError: false,
        emailErrorMessage: "",
      });
    }
  };

  //   Password field validation
  const [password, setPassword] = useState({
    password: "",
    passwordError: false,
    passwordErrorMessage: "",
  });

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const passwordOnChangerHandler = (e) => {
    if (passwordRegex.test(e.target.value)) {
      setPassword({
        ...password,
        password: e.target.value,
        passwordError: false,
        passwordErrorMessage: "",
      });
    } else {
      setPassword({
        ...password,
        password: e.target.value,
        passwordError: true,
        passwordErrorMessage: "Password Not Valid!",
      });
    }
    if (e.target.value.trim().length === 0) {
      setPassword({
        ...password,
        password: e.target.value,
        passwordError: false,
        passwordErrorMessage: "",
      });
    }
  };

  //   Confirm Password
  const [confirmPassword, setConfirmPassword] = useState({
    password: "",
    passwordError: false,
    passwordErrorMessage: "",
  });

  const confirmPasswordOnChangerHandler = (e) => {
    if (passwordRegex.test(e.target.value)) {
      setConfirmPassword({
        ...password,
        password: e.target.value,
        passwordError: false,
        passwordErrorMessage: "",
      });
    } else {
      setConfirmPassword({
        ...password,
        password: e.target.value,
        passwordError: true,
        passwordErrorMessage: "Password Not Valid!",
      });
    }
    if (e.target.value.trim().length === 0) {
      setConfirmPassword({
        ...password,
        password: e.target.value,
        passwordError: false,
        passwordErrorMessage: "",
      });
    }
  };

  //   CheckInput Fields
  const checkInputFieldConfirmPassword = () => {
    let errorFlag = false;
    // if (emailValue.email.length === 0) {
    //   setEmailValue({
    //     ...emailValue,
    //     emailError: true,
    //     emailErrorMessage: "*Required",
    //   });
    //   errorFlag = true;
    // }

    // if (password.password.length === 0) {
    //   setPassword({
    //     ...password,
    //     passwordError: true,
    //     passwordErrorMessage: "*Required",
    //   });
    //   errorFlag = true;
    // }

    // if (confirmPassword.password.length === 0) {
    //   setConfirmPassword({
    //     ...password,
    //     passwordError: true,
    //     passwordErrorMessage: "*Required",
    //   });
    //   errorFlag = true;
    // }

    if (password.password !== confirmPassword.password) {
      setConfirmPassword({
        ...setConfirmPassword,
        passwordError: true,
        passwordErrorMessage: "Password does not match, Please check again!",
      });
      errorFlag = true;
    }
    return errorFlag;
  };

  // Loader
  const [openLoader, SetOpenLoader] = useState(false);

  // Disable Register button
  const [disableBtn, setDisableBtn] = useState(true);
  useEffect(() => {
    if (
      emailValue.email === "" ||
      password.password === "" ||
      confirmPassword.password === "" ||
      emailValue.emailError ||
      password.passwordError ||
      confirmPassword.passwordError
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [
    emailValue.email,
    password.password,
    confirmPassword.password,
    emailValue.emailError,
    password.passwordError,
    confirmPassword.passwordError,
  ]);

  const [registerStatus, setRegisterStatus] = useState({
    status: false,
    message: "",
    severity: "",
  });

  const handleRegisterClose = () => {
    setRegisterStatus({ status: false });
  };

  //   SubmitRegister Handler
  const navigate = useNavigate();
  const submitRegisterHandler = () => {
    if (checkInputFieldConfirmPassword() === false) {
      axios
        .post("https://reqres.in/api/register", {
          email: emailValue.email,
          password: confirmPassword.password,
        })
        .then((res) => {
          console.log(res.data);
          if (res.status) {
            SetOpenLoader(true);
            setRegisterStatus({
              status: true,
              message: "You've register successfully!",
              severity: "success",
            });
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log(err.message);
          if (err) {
            SetOpenLoader(true);
            setRegisterStatus({
              status: true,
              message: "register Failed, Please try again.",
              severity: "error",
            });
            setTimeout(() => {
              SetOpenLoader(false);
            }, 2000);
          }
        });
    }
  };

  return (
    <Grid className="SignupStyle">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleOutlineRoundedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>

        <form style={formStyle}>
          <TextField
            label="Email"
            type="email"
            margin="normal"
            onChange={userNameOnchangeHandler}
            error={emailValue.emailError}
            helperText={emailValue.emailErrorMessage}
            autoComplete="off"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            margin="normal"
            onChange={passwordOnChangerHandler}
            error={password.passwordError}
            helperText={password.passwordErrorMessage}
            required
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            margin="normal"
            error={confirmPassword.passwordError}
            helperText={confirmPassword.passwordErrorMessage}
            onChange={confirmPasswordOnChangerHandler}
            required
            fullWidth
          />
          <Button
            variant="contained"
            style={btnStyle}
            onClick={submitRegisterHandler}
            disabled={disableBtn}
            fullWidth
          >
            Sign Up
          </Button>
        </form>
        <Typography color="initial" style={loginLinkStyle}>
          Already have account?&nbsp;
          <Link href="/">Login</Link>
        </Typography>
      </Paper>
      {/* Register SnackBar */}
      {registerStatus.status && (
        <Snackbar
          open={registerStatus.status}
          autoHideDuration={3000}
          onClose={handleRegisterClose}
          message={registerStatus.message}
        >
          <Alert
            onClose={handleRegisterClose}
            severity={registerStatus.severity}
            variant="filled"
          >
            {registerStatus.message}
          </Alert>
        </Snackbar>
      )}

      {/* Loader */}
      {openLoader && <Loader />}
    </Grid>
  );
};

export default SignUp1;
