import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { json, useNavigate } from "react-router-dom";

const SignIn = ({ setUser, state }) => {
  const [token, setToken] = useState(false);
  console.log(state);
  const navigate = useNavigate();
  const login = () => {
    setUser({
      user: "Manan Bari",
      token: "tokenTrue",
      isLoggedIn: true,
    });
  };
  useEffect(() => {
    let isLogin = localStorage.getItem("user");
    if (isLogin) {
      // console.log(JSON.parse(isLogin));
      let data = JSON.parse(isLogin);
      navigate("/");
    }
  });
  return (
    <>
      <button
        onClick={() => {
          // navigate("/");
          login();
        }}
      >
        login
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => {
      dispatch({ type: "SET_USER", payload: data });
    },
  };
};

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
