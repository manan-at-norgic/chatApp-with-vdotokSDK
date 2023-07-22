const initialState = "";

const searchUserString = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_SEARCH_STRING":
      return (state = action.payload);
    case "RESET_SEARCH_STRING":
      return (state = initialState);
    default:
      return state;
  }
};

export default searchUserString;
