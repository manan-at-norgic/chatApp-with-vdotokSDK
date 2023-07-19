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

//combie reducers
const rootReducer = combineReducers({
  auth: authReducer,
  allUsers: allusers,
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
