import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (serverUrl:string) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(serverUrl, {
      withCredentials: true,
      autoConnect: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl]);

  return socket;
};

export default useSocket