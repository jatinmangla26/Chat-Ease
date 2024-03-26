import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedConversation } from "../../redux/conversationSlice.js";
import toast from "react-hot-toast";

const SearchInput = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);

  const getConversations = async () => {
    try {
      const res = await fetch(`https://chat-ease-qx9h.onrender.com/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: userData.token,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setConversations(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }
    getConversations();

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      dispatch(setSelectedConversation(conversation));
      setSearch("");
    } else toast.error("No such user found!");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
