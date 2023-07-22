import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import env from "../config";
import { ToastContainer, toast } from "react-toastify";
import { AiTwotoneDelete } from "react-icons/ai";
import CreateGroup from "./groupCreation/CreateGroup";
import common from "./methods/common";

const Home = ({
  setLoginInfo,
  state,
  resetLoginInfo,
  setAllUsers,
  setIsUserListActive,
  setIsOneToOne,
  setGroupsList,
  setUserSearchString,
  resetSearchString,
  setGroupSearchString,
}) => {
  const inputRef = useRef(null);
  const usersRef = useRef(null);
  const [localUsers, setLocalUsers] = useState(null);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsUserListActive(true);
  };
  // handling rather than input field
  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      usersRef.current &&
      !inputRef.current.contains(event.target) &&
      !usersRef.current.contains(event.target)
    ) {
      // Close the component or perform any desired action
      setIsUserListActive(false);
      resetSearchString();
      setIsOneToOne(true);
      // console.log("Clicked outside the container and specific element");
    }
  };

  const logout = () => {
    resetLoginInfo();
    localStorage.removeItem("user");
    navigate("/");
  };

  const deleteGroup = async (id) => {
    let payload = {
      group_id: `${id}`,
      auth_token: `${state.auth.token}`,
    };
    let res = await axios.post(`${env.url}DeleteGroup`, payload);

    console.log("group deleted ====> ", res);
    toast.info(res.data.message);
    let resGroups = await common.fetchGroups(state.auth.token);

    if (resGroups.data.status === 200) {
      setGroupsList(resGroups.data.groups);
    } else {
      toast.warn(`${resGroups.data.message}`);
    }
    // alert(`delete group ---> ${id}`);
  };
  const findString = (e) => {
    if (state.searchGroupString !== "") {
      let lowered = e.group_title.toLowerCase(),
        loweredS = state.searchGroupString.toLowerCase();
      // e.username.indexOf(search) > -1
      if (lowered.indexOf(loweredS) > -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  // if logged in fetch users list (localstorage)
  useEffect(() => {
    let isLogin = localStorage.getItem("user");
    if (isLogin && state.auth.isLoggedIn === false) {
      // console.log(JSON.parse(isLogin));
      let data = JSON.parse(isLogin);
      setLoginInfo(data);
      let fetchAllUsers = async () => {
        console.warn(data.token);

        let payload = { auth_token: data.token };
        let response = await axios.post(`${env.url}AllUsers`, payload);
        // console.log(response, "response from homeeeeee");
        if (response.data.status === 200) {
          setAllUsers(response.data.users);
          setLocalUsers(response.data.users);
        } else {
          toast.warn(`${response.data.message}`);
        }

        let resGroups = await common.fetchGroups(data.token);

        if (resGroups.data.status === 200) {
          setGroupsList(resGroups.data.groups);
        } else {
          toast.warn(`${resGroups.data.message}`);
        }
      };

      fetchAllUsers();

      // navigate("/");
    }
  }, []);
  // if logged in fetch users list(redux state)
  useEffect(() => {
    if (state.auth.isLoggedIn === true) {
      let fetchAllUsers = async () => {
        let payload = { auth_token: state.auth.token };
        let response = await axios.post(`${env.url}AllUsers`, payload);
        // console.log(response, "response from homeeeeee");
        if (response.data.status === 200) {
          setAllUsers(response.data.users);
          setLocalUsers(response.data.users);
        } else {
          toast.warn(`${response.data.message}`);
        }
        let resGroups = await common.fetchGroups(state.auth.token);

        if (resGroups.data.status === 200) {
          setGroupsList(resGroups.data.groups);
        } else {
          toast.warn(`${resGroups.data.message}`);
        }
      };

      fetchAllUsers();
    }
  }, []);
  // event listner for active state and inavtive state of input field
  useEffect(() => {
    const handleWindowClick = (event) => {
      handleClickOutside(event);
    };

    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      {/* <!-- component -->
<!-- This is an example component --> */}
      <div className="h-screen w-screen shadow-lg rounded-lg">
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
        {/* <!-- headaer --> */}
        <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
          <div className="font-semibold text-2xl">Chat JS</div>
          <div className="w-1/2 ml-12">
            <input
              ref={inputRef}
              onFocus={handleFocus}
              onClick={handleFocus}
              // onBlur={handleBlur}
              type="text"
              name="searchUser"
              id="searchUser"
              value={state.searchUserString}
              onChange={(e) => {
                setUserSearchString(e.target.value);
              }}
              // onClick={() => {}}
              placeholder="search user"
              className="rounded-2xl search relative bg-gray-100 py-3 px-5 w-1/2"
            />

            <CreateGroup usersRef={usersRef} localUsers={localUsers} />
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
              RA
            </div>
            <button
              onClick={() => {
                logout();
              }}
            >
              logout
            </button>
          </div>
        </div>
        {/* <!-- end header -->
    <!-- Chatting --> */}
        <div className="flex flex-row justify-between bg-white">
          {/* <!-- chat list --> */}
          <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
            {/* <!-- search Group component --> */}
            <div className="border-b-2 py-4 px-2">
              <input
                type="text"
                value={state.searchGroupString}
                onChange={(e) => {
                  setGroupSearchString(e.target.value);
                }}
                placeholder="search chatting"
                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
              />
            </div>
            {/* <!-- end search component -->
        <!-- Groups list --> */}
            {state.groups.length > 0 ? (
              <>
                {state.groups.map((group, index) => {
                  return (
                    <div key={index}>
                      {findString(group) === true ? (
                        <div key={index}>
                          <div className="flex flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                              <img
                                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                                className="object-cover h-12 w-12 rounded-full"
                                alt=""
                              />
                            </div>
                            <div className="w-full">
                              <div className="text-lg font-semibold">
                                {group.group_title}
                              </div>
                              <span className="text-gray-500">
                                Pick me at 9:00 Am
                              </span>
                            </div>
                            <AiTwotoneDelete
                              onClick={() => {
                                deleteGroup(group.id);
                              }}
                              className="ml-8 mt-4 cursor-pointer text-red-500"
                              size="1.5rem"
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="w-full font-semibold flex-wrap text-xl mb-40 h-full flex justify-center items-center">
                <span>Loading Groups</span>
              </div>
            )}

            {/* <!-- end GROUP list --> */}
          </div>
          {/* <!-- end chat list -->
      <!-- message --> */}
          <div className="block">
            <div
              className="w-full overflow-y-scroll px-5 flex flex-col justify-between"
              style={{ height: "calc(100vh - 12rem)" }}
            >
              <div className="flex flex-col mt-5">
                <div className="flex justify-end mb-4">
                  <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                    Welcome to group everyone !
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quaerat at praesentium, aut ullam delectus odio error sit
                    rem. Architecto nulla doloribus laborum illo rem enim dolor
                    odio saepe, consequatur quas?
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <div>
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Magnam, repudiandae.
                    </div>

                    <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Debitis, reiciendis!
                    </div>
                  </div>
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    lorem ipsum doler sit
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
                <div className="flex justify-start mb-4">
                  <img
                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                    className="object-cover h-8 w-8 rounded-full"
                    alt=""
                  />
                  <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                    happy holiday guys!
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-4">
              <input
                className="bg-gray-300 py-5 px-3 rounded-xl"
                style={{ width: "91%" }}
                type="text"
                placeholder="type your message here..."
              />
              <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline">
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginInfo: (data) => {
      dispatch({ type: "SET_LOGIN_INFO", payload: data });
    },
    resetLoginInfo: (data) => {
      dispatch({ type: "RESET_LOGIN_INFO" });
    },
    setAllUsers: (data) => {
      dispatch({ type: "ALL_USERS", payload: data });
    },
    setIsOneToOne: (data) => {
      dispatch({ type: "IS_ONE_TO_ONE", payload: data });
    },
    setIsUserListActive: (data) => {
      dispatch({ type: "IS_USER_LIST_ACTIVE", payload: data });
    },
    setGroupsList: (data) => {
      dispatch({ type: "SET_ALL_GROUPS", payload: data });
    },
    setUserSearchString: (data) => {
      dispatch({ type: "SET_USER_SEARCH_STRING", payload: data });
    },
    setGroupSearchString: (data) => {
      dispatch({ type: "SET_SEARCH_GROUP_STRING", payload: data });
    },
    resetSearchString: (data) => {
      dispatch({ type: "RESET_SEARCH_STRING", payload: data });
    },
  };
};

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
