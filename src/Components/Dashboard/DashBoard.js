import "./DashBoardStyle.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  Grid,
  Modal,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CancelIcon from "@mui/icons-material/Cancel";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  setCard,
  deleteUser,
  userInfo,
  updateUser,
} from "../../redux/actions/CardActions";

const DeleteBtn = styled(Button)`
  background: #df1c1c;
  ${"" /* width: 90px; */}
  font-size: 0.8rem;
  :hover {
    background: #bd1717;
  }
`;

const EditBtn = styled(Button)`
  width: 100px;
`;

const cancelBtn = {
  borderRadius: 50,
  backgroundColor: "#627d98",
};

const borderRadiusForBtn = {
  borderRadius: 50,
};

const DashBoard = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.UserReducer.users);
  const singleUser = useSelector((state) => state.UserReducer.user);

  // API URL
  const url = "https://reqres.in/api/users?page=1";

  // Function for data fetching
  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        dispatch(setCard(res.data.data));
        setLoginSuccess("You have Login successfully, Enjoy the App!");
        setOpenSuccess(true);
      })
      .catch((err) => {
        if (err) setOpenErrorModal(true);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Edit Modal
  const [editName, setEditName] = useState({ name: "" });
  const [editEmail, setEditEmail] = useState({
    email: "",
    emailError: false,
    emailErrorMessage: "",
  });

  useEffect(() => {
    setEditName({ name: singleUser?.first_name });
    setEditEmail({ email: singleUser?.email });
    setImage(singleUser.avatar);
  }, [singleUser]);

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
    setImage(singleUser.avatar);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const onchangeEditEmailHandler = (e) => {
    if (/^\w+([-]?\.\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
      setEditEmail({
        email: e.target.value,
      });
    } else if (e.target.value.trim().length === 0) {
      setEditEmail({
        email: e.target.value,
      });
    } else {
      setEditEmail({
        ...editEmail,
        email: e.target.value,
        emailError: true,
        emailErrorMessage: "Email not valid!",
      });
    }
  };

  const onchangeEditNameHandler = (e) => {
    setEditName({ name: e.target.value });
  };

  const handleEditSave = () => {
    axios
      .put(`https://reqres.in/api/users/${singleUser.id}`, {
        first_name: editName.name,
        email: editEmail.email,
      })
      .then((res) => {
        dispatch(
          updateUser({
            name: editName.name,
            email: editEmail.email,
            id: singleUser.id,
            avatar: image,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [image, setImage] = useState("");

  const uploadImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // Delete Modal
  const [openDeleteModal, setOpenDeleteModal] = useState({
    status: false,
    user: {},
  });

  const handleDeleteModalOpen = (user) => {
    setOpenDeleteModal({ status: true, user: user });
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal({ status: false, user: {} });
  };

  const deleteCard = (id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((res) => {
        if (res.status === 204) {
          dispatch(deleteUser(id));
        }
      })
      .catch((err) => console.log(err));
  };

  // Disable Add button
  const [disbleBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    if (
      editEmail.email === "" ||
      editEmail.emailError === true ||
      editName.name === ""
    ) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [editEmail.email, editName.name, editEmail.emailError]);

  // Snackbar Login Success
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  // Error Modal
  const [openErrorModal, setOpenErrorModal] = useState(false);

  return (
    <div className="DashboardWrapper">
      <Navbar />
      <Stack direction="row" spacing={2}>
        <div className="cardDiv">
          {users.map((user) => {
            return (
              <Card className="card" elevation={10} key={user.id}>
                <Stack className="stack" spacing={2}>
                  <CardMedia>
                    {user.avatar ? (
                      <img src={user.avatar} alt="avatar" />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGYD7w9Vl5h35OeV8Q6v0s10XmDvjpzqVY5Lt6JacLCA&s"
                        alt="avatar"
                      />
                    )}
                  </CardMedia>
                  <h2>{user.first_name}</h2>
                  <p>{user.email}</p>
                  <Stack className="btnStack" direction="row">
                    <EditBtn
                      style={borderRadiusForBtn}
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => {
                        handleModalOpen({ status: true, user: user });
                        dispatch(userInfo(user.id));
                      }}
                      color="secondary"
                    >
                      Edit
                    </EditBtn>
                    <DeleteBtn
                      style={borderRadiusForBtn}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        handleDeleteModalOpen(user);
                      }}
                    >
                      Delete
                    </DeleteBtn>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </div>
      </Stack>
      {/* Edit Modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={handleModalClose}
      >
        <Paper className="modalEditModalPaper">
          <form className="editForm">
            <Grid className="editCardHeader">
              <h2>Edit User&nbsp;</h2>
              <EditIcon color="success" />
            </Grid>
            <div className="avatarImageDiv">
              <Button component="label" disableRipple>
                <img
                  className="avatarImage"
                  src={image}
                  alt={singleUser.first_name + "avatar"}
                />
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
              onChange={onchangeEditNameHandler}
              defaultValue={singleUser.first_name}
              margin="normal"
              autoComplete="off"
              required
            />
            <TextField
              type="email"
              label="Email"
              placeholder="Enter Email"
              onChange={onchangeEditEmailHandler}
              defaultValue={singleUser.email}
              error={editEmail.emailError}
              helperText={editEmail.emailErrorMessage}
              autoComplete="off"
              fullWidth
              margin="normal"
              required
            />

            <div className="editBtnGroup">
              <Button
                style={borderRadiusForBtn}
                variant="contained"
                startIcon={<BookmarkIcon />}
                margin="normal"
                disabled={disbleBtn}
                onClick={() => {
                  handleModalClose();
                  handleEditSave();
                }}
                color="success"
              >
                Save
              </Button>
              <Button
                style={cancelBtn}
                variant="contained"
                startIcon={<CancelIcon />}
                onClick={handleModalClose}
                margin="normal"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </Modal>
      {/* Modal Close */}

      {/* Delete Modal */}
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openDeleteModal.status}
        onClose={handleDeleteModalClose}
        className="modalDeleteModal"
      >
        <Paper className="modalDeleteModalPaper">
          <Grid className="DeleteHeader">
            <h2>Delete User&nbsp;</h2>
            <DeleteIcon color="error" />
          </Grid>
          <Typography>
            Are you sure you want to delete the user{" "}
            <strong>{openDeleteModal.user.first_name}</strong>?
          </Typography>

          <div className="editBtnGroup">
            <DeleteBtn
              style={borderRadiusForBtn}
              type="submit"
              variant="contained"
              margin="normal"
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteCard(openDeleteModal.user.id);
                handleDeleteModalClose();
              }}
            >
              Delete
            </DeleteBtn>
            <Button
              style={cancelBtn}
              variant="contained"
              startIcon={<CancelIcon />}
              onClick={() => handleDeleteModalClose()}
              margin="normal"
            >
              Cancel
            </Button>
          </div>
        </Paper>
      </Modal>
      {/* Delete Modal */}
      {/* Request fails SnackBar */}
      <Snackbar
        sx={{ height: "100%" }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        key={"top".concat("right")}
      >
        <Alert
          onClose={() => setOpenErrorModal(false)}
          severity="error"
          variant="filled"
        >
          "Error, We are under service! Sorry For inconvenience."
        </Alert>
      </Snackbar>

      {/* Delete Modal Close */}
      {loginSuccess && (
        <Snackbar
          open={openSuccess}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
          message={loginSuccess}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            variant="filled"
          >
            {loginSuccess}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default DashBoard;
