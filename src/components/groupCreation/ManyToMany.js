import React from "react";
import { connect } from "react-redux";
import { BsChat } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";

const ManyToMany = ({ state }) => {
  return (
    <>
      {state.allUsers.length === 0
        ? ""
        : state.allUsers.map((elem, index) => {
            return (
              <div
                key={index}
                className="rounded-lg bg-white shadow-lg flex items-center justify-around cursor-pointer h-auto my-2 border mx-6 px-6"
              >
                <div className="flex flex-row justify-center items-center">
                  <input
                    type="checkbox"
                    id={`${index}checkbox`}
                    name={`${index}-selected`}
                  />
                  <RiUser3Line className=" mr-4" />
                  <div className=" my-2 mt-3">
                    <h2 className="text-lg text-clr">{elem.username}</h2>
                  </div>
                </div>
                <BsChat />
              </div>
            );
          })}
    </>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, null)(ManyToMany);
