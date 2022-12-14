const initState = {
  users: [],
  user: [],
};
export const UserReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case "GET_USER":
      const userDetail = state.users.filter(
        (user) => user.id === action.payload
      );
      return {
        ...state,
        user: userDetail.length > 0 ? userDetail[0] : {},
      };
    case "UPDATE_USER":
      const { id, name, email, avatar } = action.payload;
      const existingUser = state.users.find((us) => us.id === id);
      const existingUserIndex = state.users.findIndex((us) => us.id === id);
      Object.assign(existingUser, {
        first_name: name,
        email: email,
        avatar: avatar,
      });
      const res = state.users.reduce((acc, user, index) => {
        if (index === existingUserIndex) {
          acc.push(existingUser);
        } else {
          acc.push(user);
        }
        return acc;
      }, []);
      return {
        ...state,
        users: res,
      };
    default:
      return state;
  }
};
