import "./NavbarStyle.css";
import styled from "@emotion/styled";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  Grid,
  TextField,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/actions/CardActions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const LogoutButton = styled(Button)({
  color: "#fff",
});

const menuIconStyle = {
  color: "#fff",
};

const cancelBtn = {
  borderRadius: 50,
  backgroundColor: "#627d98",
};

const addBtn = {
  borderRadius: 50,
};

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const logoutUser = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    navigate("/");
  };

  // Drawer States
  const [open, setOpen] = useState(false);

  const handleDrawerClose = () => {
    setOpen(!open);
  };

  //   Modal Setting Start
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setValue({ email: "" });
    setName({ userName: "" });
    setImage(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYD7w9Vl5h35OeV8Q6v0s10XmDvjpzqVY5Lt6JacLCA&s"
    );
  };

  const handleAddCard = async () => {
    await axios
      .post("https://reqres.in/api/users", {
        first_name: name.userName,
        email: value.email,
      })
      .then((res) => {
        console.log(res.data);
        const { first_name, email, id } = res.data;
        const modalValue = {
          first_name: first_name,
          email: email,
          id: id,
          avatar: image,
        };
        dispatch(registerUser(modalValue));
        setValue({ email: "" });
        setName({ userName: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Email
  const [value, setValue] = useState({
    email: "",
    emailError: false,
    emailErrorMessage: "",
  });

  const emailOnchangeHandler = (e) => {
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

  // Name
  const [name, setName] = useState({
    userName: "",
  });

  const nameOnchangeHandler = (e) => {
    setName({ userName: e.target.value });
  };

  // Disable Add button
  const [disbleBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (
      value.email === "" ||
      value.emailError === true ||
      name.userName === ""
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [value.email, name.userName, value.emailError]);
  // Modal Setting End

  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYD7w9Vl5h35OeV8Q6v0s10XmDvjpzqVY5Lt6JacLCA&s"
  );
  const uploadImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <AppBar position="sticky" className="appBar">
        <StyledToolbar className="toolbar">
          <Stack direction="row" className="navbar-stack">
            <IconButton sx={{ mr: 2 }} onClick={handleDrawerClose}>
              <MenuIcon style={menuIconStyle} />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Friends
            </Typography>
            <Diversity2Icon sx={{ display: { sx: "block", sm: "none" } }} />
            {/* Side drawer */}
            <Drawer open={open} onClose={handleDrawerClose}>
              <Box component="div" sx={{ width: "250px" }}>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        handleModalOpen();
                        handleDrawerClose();
                      }}
                    >
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add New User" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            {/* Drawer End */}
          </Stack>
          <LogoutButton startIcon={<LogoutIcon />} onClick={() => logoutUser()}>
            Logout
          </LogoutButton>
        </StyledToolbar>
      </AppBar>
      {/* Add Modal Start */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleModalClose}
      >
        <Paper className="modalEditModalPaper">
          <form className="editForm">
            <Grid className="editCardHeader">
              <h2>Add New User&nbsp;</h2>
              <AddCircleIcon color="success" />
            </Grid>
            <div className="avatarImageDiv">
              <Button component="label" disableRipple>
                <img className="avatarImage" src={image} alt="avatar" />
                <input
                  type="file"
                  accept=".png,.jpeg, .jpg"
                  onChange={uploadImage}
                  hidden
                />
              </Button>
            </div>
            <TextField
              label="Username"
              placeholder="Enter Name"
              fullWidth
              margin="normal"
              autoComplete="off"
              onChange={nameOnchangeHandler}
              required
            />
            <TextField
              type="email"
              label="Email"
              onChange={emailOnchangeHandler}
              error={value.emailError}
              helperText={value.emailErrorMessage}
              placeholder="Enter Email"
              autoComplete="off"
              fullWidth
              margin="normal"
              required
            />

            <div className="editBtnGroup">
              <Button
                style={addBtn}
                variant="contained"
                margin="normal"
                disabled={disbleBtn}
                startIcon={<AddCircleIcon />}
                onClick={() => {
                  handleAddCard();
                  handleModalClose();
                }}
                color="secondary"
              >
                Add
              </Button>
              <Button
                style={cancelBtn}
                variant="contained"
                margin="normal"
                startIcon={<CancelIcon />}
                onClick={() => {
                  handleModalClose();
                  setImage(
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYD7w9Vl5h35OeV8Q6v0s10XmDvjpzqVY5Lt6JacLCA&s"
                  );
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
      {/* Add Modal Close */}
    </>
  );
};

export default Navbar;
