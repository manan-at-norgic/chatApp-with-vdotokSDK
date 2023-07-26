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
import CurrentChat from "./inbox/CurrentChat";

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
  setLocalMsg,
  resetLocalMsg,
  setChat,
  setCurrentGroup,
  setMessages,
  setSingleChat,
  resetSingleChat,
  setMsgResponse,
  // setClient,
  // resetClient,
}) => {
  const inputRef = useRef(null);
  const usersRef = useRef(null);
  const [localUsers, setLocalUsers] = useState(null);
  const [myClient, setClient] = useState(null);
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
      resetSingleChat({});
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

  const initializeSDK = (elem) => {
    let Client = new MVDOTOK.Client({
      projectID: `${env.project_id}`,
      secret: `${env.api_key}`,
      host: `${elem.messaging_server_map.complete_address}`,
    });
    console.log(Client, "<----------------------------");
    setClient(Client);
    // console.log("client after initializing==>", Client);
    Client.Register(elem.ref_id, elem.authorization_token);
    Client.on("connect", (res) => {
      // you can do something after connecting the socket
      // console.log("**res on connect sdk", res);
      // client.Subscribe({});
    });
    Client.on("subscribed", (response) => {
      console.log(
        "**********************res on Subscribe-------------------------",
        response
      );
    });
    Client.on("message", (res) => {
      console.log(res, "----------------res heres mesaage");

      console.log(state.singleChat);
      setMessages({ ...res });
      resetLocalMsg();
    });
  };

  const handleSubmitMsg = (e) => {
    e.preventDefault();

    let idd = new Date().getTime().toString();
    let payload = {
      status: 1,
      size: 0,
      type: "text",
      from: state.auth.user.ref_id,
      content: state.localMsg.msg,
      id: idd,
      date: new Date().getTime(),
      key: state.localMsg.currentGroup.channel_key,
      to: state.localMsg.currentGroup.channel_name,
    };

    if (/\S/.test(state.localMsg.msg)) {
      // setMessages({
      //   currentChat: state.localMsg.currentGroup,
      //   message: payload,
      // });
      myClient.SendMessage(payload);
      resetLocalMsg();
    } else {
      toast.warn("Message is Blank");
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
        // console.warn(data.token);

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
        initializeSDK(state.auth.user);

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
    } else {
      let loc = localStorage.getItem("user");
      if (loc) {
        let data = JSON.parse(loc);
        initializeSDK(data.user);
      }
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
  useEffect(() => {
    if (Object.keys(state.localMsg.currentGroup).length > 0) {
      let localStateChat = state.chats;
      if (state.chats.length > 0) {
        let isIdExist = false;
        let idx = null;
        for (let i = 0; i < localStateChat.length; i++) {
          if (
            localStateChat[i].channel_name ===
            state.localMsg.currentGroup.channel_name
          ) {
            // console.log("same id ignored");
            isIdExist = true;
            idx = i;
          }
        }
        if (!isIdExist) {
          setChat({ ...state.localMsg.currentGroup, messages: [] });
        }
      } else {
        setChat({ ...state.localMsg.currentGroup, messages: [] });
      }
    }
  }, [state.localMsg.currentGroup]);
  // console.log(state.chats);

  useEffect(() => {
    let filtered = state.chats.filter(
      (chat) => chat.channel_name === state.localMsg.currentGroup.channel_name
    );
    if (filtered !== undefined) {
      setSingleChat(filtered[0]);
    }
  }, [state.chats, state.localMsg]);

  // subscribe all groups
  // subscribe all channels
  useEffect(() => {
    if (
      state.groups !== undefined &&
      state.groups.length !== 0 &&
      myClient !== null
    ) {
      console.log("hi-------");
      let grpsToSubscribe = [];
      state.groups.map((e) => {
        grpsToSubscribe.push({ key: e.channel_key, channel: e.channel_name });
      });

      grpsToSubscribe.map((e) => {
        console.log(e);
        myClient.Subscribe(e);
      });
      // myClient.on("subscribed", (res) => {
      //   console.log("res on Subscribe-------------------------", res);
      // });
    }
  }, [state.groups]);
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
          <div className="flex flex-col w-2/5 border-r-2">
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
              <div className="overflow-y-scroll scroll-custom h-[77vh] ">
                {state.groups.map((group, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentGroup({ ...group });
                      }}
                    >
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
              </div>
            ) : (
              <div className="w-full font-semibold flex-wrap text-xl mb-40 h-full flex justify-center items-center">
                <span>Loading Groups</span>
              </div>
            )}

            {/* <!-- end GROUP list --> */}
          </div>
          {/* <!-- end chat list -->
          <!-- message --> */}
          {Object.keys(state.singleChat).length !== 0 ? (
            <div className="w-full relative">
              <div
                className="w-full overflow-y-scroll mt-9 px-5 flex flex-col justify-between scroll-custom"
                style={{ height: "calc(100vh - 12rem)" }}
              >
                <div className="flex flex-col mt-5 w-full">
                  <CurrentChat />
                </div>
              </div>
              <form>
                <div className="flex justify-center items-center w-full">
                  <input
                    className="bg-gray-300 py-5 px-3 rounded-xl"
                    style={{ width: "91%" }}
                    type="text"
                    value={state.localMsg.msg}
                    onChange={(e) => {
                      setLocalMsg(e.target.value);
                    }}
                    placeholder="type your message here..."
                  />
                  <button
                    type="submit"
                    onClick={handleSubmitMsg}
                    className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-5 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    submit
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex justify-center items-center h-full font-semibold text-2xl">
                Start Chat
              </div>
            </div>
          )}
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
    setLocalMsg: (data) => {
      dispatch({ type: "SET_LOCAL_MSG", payload: data });
    },
    resetLocalMsg: (data) => {
      dispatch({ type: "RESET_LOCAL_MSG", payload: data });
    },
    setChat: (data) => {
      dispatch({ type: "SET_CHAT", payload: data });
    },
    setCurrentGroup: (data) => {
      dispatch({ type: "SET_CURRENT_GROUP", payload: data });
    },
    setMessages: (data) => {
      dispatch({ type: "SET_MSGS", payload: data });
    },
    setSingleChat: (data) => {
      dispatch({ type: "SET_SINGLE_CHAT", payload: data });
    },
    resetSingleChat: (data) => {
      dispatch({ type: "RESET_SINGLE_CHAT", payload: data });
    },
    setMsgResponse: (data) => {
      dispatch({ type: "SET_MSG_RESPONSE", payload: data });
    },
  };
};

const mapStateToProps = (state) => ({
  state: state,
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
