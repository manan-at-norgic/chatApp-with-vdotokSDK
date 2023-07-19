import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import env from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignUp = ({ setUser, state }) => {
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle onchange
  const onChangeInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
  };
  // console.log(state);
  const navigate = useNavigate();

  const login = async (e) => {
    try {
      e.preventDefault();
      if (!e.target[0].value || !e.target[1].value || !e.target[2].value)
        throw "Please all fields properly";

      let payload = {
        project_id: env.project_id,
        full_name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      };
      let resp = await axios.post(`${env.url}SignUp`, payload);

      if (resp.data.status === 200) {
        setUser({
          user: resp.data,
          token: resp.data.auth_token,
          isLoggedIn: true,
        });
      } else {
        toast.warn(`Error: ${resp.data.message}`);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
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
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="username"
                  value={signUpForm.name}
                  onChange={(e) => onChangeInput(e)}
                  name="name"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="email"
                  value={signUpForm.email}
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
                  pattern=".{8,}"
                  title="length of Password should be atleast 8"
                  placeholder="******************"
                  value={signUpForm.password}
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
                  value="Sign Up"
                />

                <Link
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to="/login"
                >
                  Login
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
          </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
