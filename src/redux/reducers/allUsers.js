const initialState = [];

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_USERS":
      state = [...action.payload];
    default:
      return state;
  }
  return state;
};

export default allUsers;
