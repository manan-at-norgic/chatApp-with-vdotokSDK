const initialState = {
  isGroupNameModal: false,
};

const groupNameModal = (state = initialState, action) => {
  switch (action.type) {
    case "IS_GROUP_NAME_MODAL_ACTIVE":
      return (state = { ...state, isGroupNameModal: action.payload });
    default:
      return state;
  }
};

export default groupNameModal;
