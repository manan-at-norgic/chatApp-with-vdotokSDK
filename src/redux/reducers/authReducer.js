const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return (state = {
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        token: action.payload.token,
      });

    case "RESET_USER":
      return (state = initialState);
    default:
      return state;
  }
};

export default authReducer;
