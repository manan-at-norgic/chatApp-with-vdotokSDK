import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import env from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignIn = ({ setUser, state }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  // handle onchange
  const onChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(state);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      if (!e.target[0].value || !e.target[1].value)
        throw "Please all fields properly";

      let payload = {
        project_id: env.project_id,
        email: formData.email,
        password: formData.password,
      };
      let resp = await axios.post(`${env.url}Login`, payload);

      if (resp.data.status === 200) {
        setUser({
          user: resp.data,
          token: resp.data.auth_token,
          isLoggedIn: true,
        });
      } else {
        toast.warn(`${resp.data.message}`);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
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
      <div className="container ">
        <div className=" flex justify-center items-center w-screen h-screen ">
          <div className="w-full max-w-xs">
            <form
              onSubmit={login}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username/email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username/email"
                  value={formData.email}
                  onChange={(e) => onChangeInput(e)}
                  name="email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={formData.password}
                  onChange={(e) => onChangeInput(e)}
                  name="password"
                  required
                />
                {/* <p className="text-red-500 text-xs italic">
                  Please choose a password.
                </p> */}
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="login"
                />

                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </form>
            {/* <p className="text-center text-gray-500 text-xs">
              &copy;2020 Acme Corp. All rights reserved.
            </p> */}
          </div>
          {/* <button
            onClick={() => {
              // navigate("/");
              login();
            }}
          >
            login
          </button> */}
        </div>
      </div>
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
