import React from "react";
import { connect } from "react-redux";
import { BsChat } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";
import env from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import common from "../methods/common";

const Group1to1 = ({
  state,
  setIsUserListActive,
  resetSearchString,
  setGroupsList,
}) => {
  const createGroup = async (e) => {
    console.log(e, "--------------------------------");
    let payload = {
      group_title: e.username,
      auth_token: `${state.auth.user.auth_token}`,
      participants: [`${e.user_id}`],
      auto_created: 1,
    };
    const res = await axios.post(`${env.url}CreateGroup`, payload);
    if (res.data.status === 200) {
      if (!res.data.is_already_created) {
        toast.info(`${res.data.message}`);
        setIsUserListActive(false);
        resetSearchString();
        // fetch latest groups list
        let resGroups = await common.fetchGroups(state.auth.token);
        if (resGroups.data.status === 200) {
          setGroupsList(resGroups.data.groups);
        } else {
          toast.warn(`${resGroups.data.message}`);
        }
      } else {
        setIsUserListActive(false);
        resetSearchString();
        toast.error("Group Already Exist");
      }
      // fetch latest groups list end
    } else {
      toast.error(`${res.data.message}`);
    }
    console.log(res.data, res.status);

    //pass payload to api 😋 done
  };

  const findString = (e) => {
    if (state.searchUserString !== "") {
      let lowered = e.username.toLowerCase(),
        loweredS = state.searchUserString.toLowerCase();
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
  return (
    <>
      {state.allUsers.length === 0
        ? ""
        : state.allUsers.map((elem, index) => {
            return (
              <div key={index}>
                {findString(elem) === true ? (
                  <div
                    onClick={() => {
                      createGroup(elem);
                    }}
                    className="rounded-lg bg-white shadow-lg flex items-center justify-around cursor-pointer h-auto my-2 border mx-6 px-6"
                  >
                    <div className="flex flex-row justify-center items-center">
                      <RiUser3Line className="mt-1 mr-4" />
                      <div className=" my-2 mt-3">
                        <h2 className="text-lg text-clr">{elem.username}</h2>
                      </div>
                    </div>
                    <BsChat className="mt-1" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Group1to1);
