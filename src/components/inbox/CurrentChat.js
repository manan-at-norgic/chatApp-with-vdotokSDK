import { useRef } from "react";
import { connect } from "react-redux";

const CurrentChat = ({ state }) => {
  const msgsRef = useRef(null);
  // only need to render it after filtering messages according to the current component
  return (
    // <>
    //   {state.chats.length > 0 &&
    //   state.chats.filter(
    //     (chat) => chat.id === state.localMsg.currentGroup.id
    //   )[0].messages.length > 0
    //     ? state.chats
    //         .filter((chat) => chat.id === state.localMsg.currentGroup.id)[0]
    //         .messages.map((elem, idx) => {
    //           return <div key={idx}>{elem.content}</div>;
    //         })
    //     : ""}
    // </>
    // Object.keys(state.singleChat).length > 0 &&state.singleChat.message.length > 0
    <div ref={msgsRef} className=" h-[calc(70vh)]">
      {Object.keys(state.singleChat).length !== 0 &&
      state.singleChat.messages.length !== 0 ? (
        <>
          {state.singleChat.messages.map((elem, idx) => {
            return (
              <div key={idx}>
                <div className="flex flex-col mt-5">
                  <div
                    className={`flex mb-4 ${
                      elem.isSenByMe ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      {elem.content}
                    </div>
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="text-center">Start Chat</div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });
export default connect(mapStateToProps, null)(CurrentChat);
