const initialState = [];

const chats = (state = initialState, action) => {
  //   console.log(action, "before switch");
  switch (action.type) {
    case "SET_CHAT":
      return (state = [...state, action.payload]);
    case "SET_MSGS":
      console.warn(action.payload, "0000");

      if (state.length > 1) {
        let obJ = { exist: false, channel_name: "" };
        for (let i = 0; i < state.length; i++) {
          if (state[i].channel_name === action.payload.to) {
            console.warn(
              "same id ignored",
              ` ${state[i].channel_name}===${action.payload.to}`
            );
            obJ.exist = true;
            obJ.channel_name = state[i].channel_name;
          }
        }
        if (obJ) {
          state.forEach((elem) => {
            if (elem.channel_name === obJ.channel_name) {
              return (elem.messages = [...elem.messages, action.payload]);
            }
          });
        }
      } else {
        console.log(action.payload);
        return (state = [
          {
            ...state[0],
            messages: [...state[0].messages, action.payload],
          },
        ]);
      }
    default:
      return state;
  }
};

export default chats;
