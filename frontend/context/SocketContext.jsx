import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export  const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (userData) {
      console.log("Trying to connect a user")
      const socket = io("http://localhost:5000", {
        query: {
          userId: userData._id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userData]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
