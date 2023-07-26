import { useRef } from "react";
import { connect } from "react-redux";

const CurrentChat = ({ state }) => {
  const msgsRef = useRef(null);
  // only need to render it after filtering messages according to the current component
  return (
    <div ref={msgsRef} className=" h-[calc(70vh)]">
      <div className="absolute text-center left-0 top-0 container h-auto text-xl font-medium uppercase rounded-2xl mt-px bg-gray-100 text-gray-400">
        {state.singleChat.group_title}
      </div>

      {Object.keys(state.singleChat).length !== 0 &&
      state.singleChat.messages.length !== 0 ? (
        <>
          {state.singleChat.messages.map((elem, idx) => {
            return (
              <>
                <div key={idx}>
                  {elem.from && elem.from === state.auth.user.ref_id ? (
                    <>
                      {
                        <div className="flex flex-col -mt-px">
                          <div className={`flex mb-4 justify-end`}>
                            <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                              {/* {elem.from} {state.auth.user.ref_id} */}
                              {elem.content}
                            </div>
                            <img
                              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                              className="object-cover h-8 w-8 rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      }
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col -mt-px">
                        <div className="flex justify-start mb-4">
                          <img
                            src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                            className="object-cover h-8 w-8 rounded-full"
                            alt=""
                          />
                          <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                            {elem.content}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
export default connect(mapStateToProps, null)(CurrentChat);
