import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { setUserMessages } from "../../redux/messagesSlice.js";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import MessageSkeleton from "../MessageSkeletion";

const Messages = () => {
  const dispatch = useDispatch();
  const { selectedConversation } = useSelector(
    (state) => state.selectedConversation
  );
  const { userData } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      console.log("Selected COn")

      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    console.log("Fetching all messages with this user");
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/${selectedConversation._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: userData.token,
            }),
          }
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        dispatch(setUserMessages(data));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white" >Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
