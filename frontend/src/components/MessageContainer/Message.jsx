import React from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const formattedTime = extractTime(message.createdAt);
  const { userData } = useSelector((state) => state.user);
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );
  const fromMe = message.senderId === userData._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? userData.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer text-white opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
