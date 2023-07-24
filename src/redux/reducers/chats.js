const initialState = [];

const chats = (state = initialState, action) => {
  //   console.log(action, "before switch");
  switch (action.type) {
    case "SET_CHAT":
      return (state = [...state, action.payload]);
    case "SET_MSGS":
      console.log(action.payload, "0000");

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
    //   for (let i = 0; i < state.length; i++) {
    //     if (state[i].id === action.payload.currentChat.id) {
    //       console.log("SET_MSGS", action.payload);

    //       if (state[i].message !== undefined) {
    //         console.log(state[i], "from if");
    //         return (state[i] = {
    //           ...state[i],
    //           messages: [...state[i].messages, action.payload.message],
    //         });
    //       } else {
    //         return (state[i] = {
    //           ...state[i],
    //           messages: [action.payload.message],
    //         });
    //       }
    //     } else {
    //       console.log(
    //         "elsee",
    //         action.payload.currentChat.id,
    //         "----------",
    //         state[i].id
    //       );
    //     }
    //   }
    default:
      return state;
  }
};

export default chats;
