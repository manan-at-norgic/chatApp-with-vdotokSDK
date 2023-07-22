const initialState = "";

const searchGroupString = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_GROUP_STRING":
      return (state = action.payload);
    default:
      return state;
  }
};

export default searchGroupString;
