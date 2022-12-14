export const setCard = (users) => {
  return {
    type: "GET_USERS",
    payload: users,
  };
};

export const registerUser = (user) => {
  return {
    type: "ADD_USER",
    payload: user,
  };
};

export const deleteUser = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  };
};

export const userInfo = (id) => {
  return {
    type: "GET_USER",
    payload: id,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};
