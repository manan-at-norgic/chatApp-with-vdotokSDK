import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import env from "../../config";
import { ToastContainer, toast } from "react-toastify";
import common from "../methods/common";

const MtoMGroupName = ({
  state,
  setGroupNameModal,
  setIsUserListActive,
  setGroupsList,
  resetSearchString,
}) => {
  const [groupName, setGroupName] = useState(null);
  const createGroup = async (e) => {
    e.preventDefault();
    let participants = [];
    state.checkboxCheckedList.map((elem) => {
      let parsedElem = JSON.parse(elem);
      return participants.push(parsedElem.user_id);
    });
    let payload = {
      auth_token: `${state.auth.user.auth_token}`,
      group_title: groupName,
      participants: [...participants],
      auto_created: 0,
    };
    const res = await axios.post(`${env.url}CreateGroup`, payload);
    if (res.data.status === 200) {
      toast.info(`${res.data.message}`);
      setIsUserListActive(false);
      resetSearchString();
      setGroupNameModal(false);

      // fetch latest groups list
      let resGroups = await common.fetchGroups(state.auth.token);
      if (resGroups.data.status === 200) {
        setGroupsList(resGroups.data.groups);
      } else {
        toast.warn(`${resGroups.data.message}`);
      }
      // fetch latest groups list end
    } else {
      toast.error(`${res.data.message}`);
    }
    console.log(res.data, res.status);

    //pass payload to api 😋 done
  };
  return (
    <>
      <div
        onClick={(event) => {
          event.stopPropagation();
          setGroupNameModal(false);
        }}
        className="absolute backdrop-blur-sm z-[1] top-0 left-0 w-screen h-screen border border-red-500 transition-all"
      ></div>

      <div
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="absolute top-1/4 left-[calc(42vw)] border rounded-lg shadow-xl z-10"
      >
        {/* <!-- Main modal --> */}
        <div
          id="authentication-modal"
          className="top-0 left-0 right-0 z-50 w-full overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative  rounded-lg shadow bg-white">
              <button
                onClick={() => {
                  setGroupNameModal(false);
                }}
                type="button"
                className="absolute top-3 right-2.5 text-red-400 bg-transparent hover:text-red-500 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                // data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  // aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 pt-8 lg:px-8">
                <h3 className="mb-4 text-xl font-medium">Enter Group Name</h3>
                <form className="space-y-6" action="#">
                  <div>
                    <input
                      type="text"
                      name="grupName"
                      id="groupName"
                      // value={groupName}
                      onChange={(e) => {
                        setGroupName(e.target.value);
                      }}
                      className=" text-sm rounded-lg bg-gray-100 block w-full p-2.5"
                      placeholder="Group Name..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={createGroup}
                    className="
                    bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline
                    w-full text-sm px-5 py-2.5 text-center"
                  >
                    Create Group
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setGroupNameModal: (data) => {
      dispatch({ type: "IS_GROUP_NAME_MODAL_ACTIVE", payload: data });
    },
    setIsUserListActive: (data) => {
      dispatch({ type: "IS_USER_LIST_ACTIVE", payload: data });
    },
    setGroupsList: (data) => {
      dispatch({ type: "SET_ALL_GROUPS", payload: data });
    },
    resetSearchString: (data) => {
      dispatch({ type: "RESET_SEARCH_STRING", payload: data });
    },
  };
};
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(MtoMGroupName);
