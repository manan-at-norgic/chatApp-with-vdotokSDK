const initialState = {};

const singleChat = (state = initialState, action) => {
  //   console.log(action, "before switch");
  switch (action.type) {
    case "SET_SINGLE_CHAT":
      return (state = { ...action.payload });
    case "RESET_SINGLE_CHAT":
      return (state = initialState);
    default:
      return state;
  }
};

export default singleChat;
