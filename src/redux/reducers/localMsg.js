const initialState = {
  currentGroup: {},
  msg: "",
};

const searchGroupString = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOCAL_MSG":
      return (state = { ...state, msg: action.payload });
    case "SET_CURRENT_GROUP":
      return (state = { ...state, currentGroup: { ...action.payload } });
    case "RESET_LOCAL_MSG":
      return (state = { ...state, msg: initialState.msg });
    default:
      return state;
  }
};

export default searchGroupString;
