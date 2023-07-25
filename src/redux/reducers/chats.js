const initialState = [];

const chats = (state = initialState, action) => {
  //   console.log(action, "before switch");
  switch (action.type) {
    case "SET_CHAT":
      return (state = [...state, action.payload]);
    case "SET_MSGS":
      //   console.log(action.payload, "0000");

      if (state.length > 1) {
        let obJ = { exist: false, id: "" };
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.payload.currentChat.id) {
            // console.log("same id ignored");
            obJ.exist = true;
            obJ.id = state[i].id;
          }
        }
        if (obJ) {
          state.forEach((elem) => {
            if (elem.id === Number(obJ.id)) {
              return (elem.messages = [
                ...elem.messages,
                action.payload.message,
              ]);
            }
          });
        }
      } else {
        console.log(action.payload);
        return (state = [
          {
            ...state[0],
            messages: [...state[0].messages, action.payload.message],
          },
        ]);
      }
    default:
      return state;
  }
};

export default chats;
