import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./redux/reducers/authReducer";

import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import allusers from "./redux/reducers/allUsers";
import userListBox from "./redux/reducers/userListBox";
import checkboxCheckedList from "./redux/reducers/checkboxCheckedList";
import groupNameModal from "./redux/reducers/groupNameModal";
import groupsReducer from "./redux/reducers/groupsReducer";
import searchUserString from "./redux/reducers/searchUserString";
import searchGroupString from "./redux/reducers/searchGroupString";
import localMsg from "./redux/reducers/localMsg";
import chats from "./redux/reducers/chats";
import singleChat from "./redux/reducers/singleChat";
import msgResponse from "./redux/reducers/msgResponse";
//combie reducers
const rootReducer = combineReducers({
  auth: authReducer,
  allUsers: allusers,
  userListBox: userListBox,
  checkboxCheckedList: checkboxCheckedList,
  groupNameModal: groupNameModal,
  groups: groupsReducer,
  searchUserString: searchUserString,
  searchGroupString: searchGroupString,
  localMsg: localMsg,
  chats: chats,
  singleChat: singleChat,
  msgRespone: msgResponse,
});
// Creating store
const store = createStore(rootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
