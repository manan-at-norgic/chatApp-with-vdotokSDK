import Group1to1 from "./OneToOne";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdOutlineKeyboardBackspace, MdDone } from "react-icons/md";
import ManyToMany from "./ManyToMany";
import { connect } from "react-redux";
import MtoMGroupName from "./MtoMGroupName";
import { useState } from "react";

//get local users from redux
const CreateGroup = ({ usersRef, state, setIsOneToOne, resetCheckboxItem }) => {
  const [groupNameModal, setGroupNameModal] = useState(false);
  const changeGroupType = () => {
    setIsOneToOne(!state.userListBox.isOneToOne);
    resetCheckboxItem();
  };
  const usersSelected = () => {
    if (state.checkboxCheckedList.length > 0) {
      console.log("ok");
      setGroupNameModal(true);
    } else {
      console.log("not ok");
    }
  };
  return (
    <>
      {groupNameModal ? <MtoMGroupName /> : ""}
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
                    className="my-2 h-8 justify-between font-semibold text-lg flex items-center text-center border"
                    ref={usersRef}
                  >
                    <span className=" ml-28">create group chat</span>
                    <span
                      onClick={changeGroupType}
                      className="ml-4 cursor-pointer"
                    >
                      <AiOutlineUsergroupAdd
                        className="mr-14 text-blue-500"
                        size="1.5rem"
                      />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className=" my-2 h-8  font-semibold text-lg flex items-center justify-around text-center border"
                    ref={usersRef}
                  >
                    <span
                      onClick={changeGroupType}
                      className="ml-4 cursor-pointer"
                    >
                      <MdOutlineKeyboardBackspace
                        className="text-blue-500"
                        size="1.5rem"
                      />
                    </span>
                    <span className="ml-2">Go Back</span>
                    <MdDone
                      className={`${
                        state.checkboxCheckedList.length > 0
                          ? "text-blue-500 cursor-pointer"
                          : "text-gray-400"
                      }`}
                      size="1.5rem"
                      onClick={usersSelected}
                    />
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
    resetCheckboxItem: (data) => {
      dispatch({ type: "RESET_CHECKBOX", payload: data });
    },
  };
};
const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
