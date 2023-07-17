import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = ({ setUser, state, resetUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    // let isLogin = localStorage.getItem("login");
    // setUser({ isLoggedIn: false, user: null, token: null });
    resetUser();
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("user");
    if ((isLogin && state.isLoggedIn === false) || state == undefined) {
      // console.log(JSON.parse(isLogin));
      let data = JSON.parse(isLogin);
      setUser(data);
      // navigate("/");
    }
  }, []);
  return (
    <>
      <div>Home Page</div>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (data) => {
      dispatch({ type: "SET_USER", payload: data });
    },
    resetUser: (data) => {
      dispatch({ type: "RESET_USER" });
    },
  };
};

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
