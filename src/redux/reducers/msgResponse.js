const initialState = {};

const msgResponse = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MSG_RESPONSE":
      return (state = { ...action.payload });
    default:
      return state;
  }
};

export default msgResponse;
