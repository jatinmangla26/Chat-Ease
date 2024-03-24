import MessageInput from "./MessageInput";
import Messages from "./Messages";
import NoChatSelected from "./NoChatSelected";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationSlice.js";
const MessageContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // cleanup function (unmounts)
    return () => dispatch(setSelectedConversation(null));
  }, [setSelectedConversation]);
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );

  const noChatSelected = selectedConversation ? false : true;

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected></NoChatSelected>
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To:</span>{" "}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;
