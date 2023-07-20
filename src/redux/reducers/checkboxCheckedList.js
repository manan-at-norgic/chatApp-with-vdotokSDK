const initialState = [];

const checkboxCheckedList = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CHECKBOX":
      return (state = [...state, action.payload]);
    case "REMOVE_CHECKBOX":
      return (state = state.filter((elem) => elem != action.payload));
    case "RESET_CHECKBOX":
      return (state = initialState);
    default:
      return state;
  }
};

export default checkboxCheckedList;
