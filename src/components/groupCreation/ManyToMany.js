import { connect } from "react-redux";
import { BsChat } from "react-icons/bs";
import { RiUser3Line } from "react-icons/ri";

const ManyToMany = ({ state, setCheckboxCheckedList, removeCheckboxItem }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckboxCheckedList(value);
    } else {
      removeCheckboxItem(value);
    }
  };
  return (
    <>
      {state.allUsers.length === 0
        ? ""
        : state.allUsers.map((elem, index) => {
            return (
              <div
                key={index}
                className="rounded-lg relative bg-white shadow-lg flex items-center justify-around h-auto my-2 border mx-6 px-6"
              >
                <input
                  type="checkbox"
                  id={`${index}checkbox`}
                  name={`${index}checkbox`}
                  value={`${index}`}
                  onChange={handleCheckboxChange}
                  className="cursor-pointer absolute ml-56 check_box"
                />
                <label
                  className=" flex flex-row justify-center items-center cursor-pointer"
                  htmlFor={`${index}checkbox`}
                >
                  <RiUser3Line className="mt-1 mr-4" />
                  <div className=" my-2 mt-3">
                    <h2 className="text-lg text-clr">{elem.username}</h2>
                  </div>
                </label>
                <label htmlFor={`${index}checkbox`}>
                  <BsChat className="mt-1 cursor-pointer" />
                </label>
              </div>
            );
          })}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCheckboxCheckedList: (data) => {
      dispatch({ type: "ADD_CHECKBOX", payload: data });
    },
    removeCheckboxItem: (data) => {
      dispatch({ type: "REMOVE_CHECKBOX", payload: data });
    },
  };
};

const mapStateToProps = (state) => ({
  state: state,
});

export default connect(mapStateToProps, mapDispatchToProps)(ManyToMany);
