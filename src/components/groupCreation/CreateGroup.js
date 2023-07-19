import React, { useState } from "react";
import Group1to1 from "./OneToOne";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ManyToMany from "./ManyToMany";
import { connect } from "react-redux";

//get local users from redux
const CreateGroup = ({ usersRef, localUsers, state, setIsOneToOne }) => {
  //   const [isOneToOne, setIsOneToOne] = useState(true);

  const changeGroupType = () => {
    setIsOneToOne(!state.userListBox.isOneToOne);
  };

  return (
    <>
      {state.userListBox.isUserListActive ? (
        <>
          <div
            ref={usersRef}
            className="absolute flex flex-col rounded-2xl bg-slate-50 border w-1/4"
          >
            <div onClick={changeGroupType}>
              {state.userListBox.isOneToOne ? (
                <>
                  <div
                    className="my-2 h-8 cursor-pointer font-semibold text-lg flex justify-center items-center text-center border"
                    ref={usersRef}
                  >
                    <AiOutlineUsergroupAdd className="ml-4" />{" "}
                    <span className="ml-6">create group chat</span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="my-2 h-8 cursor-pointer font-semibold text-lg flex justify-center items-center text-center border"
                    ref={usersRef}
                    onClick={changeGroupType}
                  >
                    <MdOutlineKeyboardBackspace className="ml-4" />{" "}
                    <span className="ml-6">Go Back</span>
                  </div>
                </>
              )}
            </div>
            <div
              id="users"
              className=" overflow-y-scroll  "
              style={{ height: "calc(100vh - 24rem)" }}
            >
              {state.userListBox.isOneToOne ? (
                <Group1to1 usersRef={usersRef} localUsers={localUsers} />
              ) : (
                <ManyToMany />
              )}
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
