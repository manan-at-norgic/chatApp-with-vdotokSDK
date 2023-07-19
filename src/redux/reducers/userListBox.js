const initialState = {
  isUserListActive: false,
  isOneToOne: true,
};

const userListBox = (state = initialState, action) => {
  switch (action.type) {
    case "IS_USER_LIST_ACTIVE":
      return (state = { ...state, isUserListActive: action.payload });
    case "IS_ONE_TO_ONE":
      return (state = { ...state, isOneToOne: action.payload });
    default:
      return state;
  }
};

export default userListBox;
