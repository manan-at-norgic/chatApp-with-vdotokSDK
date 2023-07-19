const initialState = [];

const allUsers = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_USERS":
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default allUsers;
