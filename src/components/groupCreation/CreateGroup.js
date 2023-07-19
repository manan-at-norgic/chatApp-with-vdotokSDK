import React, { useState } from "react";
import Group1to1 from "./OneToOne";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineKeyboardBackspace, MdDone } from "react-icons/md";
import ManyToMany from "./ManyToMany";
import { connect } from "react-redux";

//get local users from redux
const CreateGroup = ({ usersRef, localUsers, state, setIsOneToOne }) => {
  //   const [isOneToOne, setIsOneToOne] = useState(true);

  const changeGroupType = () => {
    setIsOneToOne(!state.userListBox.isOneToOne);
  };
  const usersSelected = () => {
    console.log("usersSelected");
  };
  return (
    <>
      {state.userListBox.isUserListActive ? (
        <>
          <div
            ref={usersRef}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="absolute flex flex-col rounded-2xl bg-slate-50 border w-1/4"
          >
            <div>
              {state.userListBox.isOneToOne ? (
                <>
                  <div
                    className="my-2 h-8  font-semibold text-lg flex items-center text-center border"
                    ref={usersRef}
                  >
                    <span
                      onClick={changeGroupType}
                      className="ml-4 cursor-pointer"
                    >
                      <AiOutlineUsergroupAdd />
                    </span>
                    <span className="ml-6">create group chat</span>
                  </div>
                </>
              ) : (
                <>
                  {/* change Group type not working properly */}
                  <div
                    className=" my-2 h-8  font-semibold text-lg flex items-center text-center border"
                    ref={usersRef}
                  >
                    <span
                      onClick={changeGroupType}
                      className="ml-4 cursor-pointer"
                    >
                      <MdOutlineKeyboardBackspace />
                    </span>
                    <span className="ml-6">Go Back</span>
                    <MdDone onClick={usersSelected} />
                  </div>
                </>
              )}
            </div>
            <div
              id="users"
              className=" overflow-y-scroll  "
              style={{ height: "calc(100vh - 24rem)" }}
            >
              {state.userListBox.isOneToOne ? <Group1to1 /> : <ManyToMany />}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    setIsOneToOne: (data) => {
      dispatch({ type: "IS_ONE_TO_ONE", payload: data });
    },
  };
};
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
