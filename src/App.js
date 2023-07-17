import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Home from "./components/Home";
import Protected from "./components/Protected";

const App = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Protected Component={Home} />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return routes;
  //   (
  //     <>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/signin" element={<SignIn />} />
  //         <Route path="/signup" element={<SignUp />} />
  //       </Routes>
  //     </>
  //   );
};

export default App;
