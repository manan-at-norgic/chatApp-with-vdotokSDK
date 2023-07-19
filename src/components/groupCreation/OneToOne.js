import React from "react";

import { BsChat } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";

const Group1to1 = ({ localUsers }) => {
  return (
    <>
      {localUsers === null
        ? ""
        : localUsers.map((elem, index) => {
            return (
              <div
                key={index}
                className="rounded-lg bg-white shadow-lg flex items-center justify-around cursor-pointer h-auto my-2 border mx-6 px-6"
              >
                <div className="flex flex-row justify-center items-center">
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

export default Group1to1;
