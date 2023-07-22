const initialState = [];

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ALL_GROUPS":
      return (state = [...action.payload]);
    default:
      return state;
  }
};

export default groupsReducer;
