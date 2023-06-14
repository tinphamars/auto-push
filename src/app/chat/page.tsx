"use client";

import Image from "next/image";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Users from "../component/users";
import Messages from "../component/messages";
import { getFriendList } from "../api/login";

interface Message {
  userId: number;
  type: boolean;
  value: string;
}

// Message type
interface MessageShow {
  userId: number;
  value: string;
}

export default function Chat() {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<Message>({
    userId: 10,
    type: true,
    value: "",
  });

  const [fromServer, setFromServer] = useState<MessageShow | null>(null);

  const setupSocket = () => {
    const newSocket: any = io("http://localhost:7171");
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
  };

  useEffect(() => {
    setupSocket();
    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on("message", (data: string) => {
        console.log(data);
      });

    return () => {
      socket && socket.disconnect();
    };
  }, [socket]);

  const handleFocusInputChat = () => {
    socket && socket.emit("typing", "typing");
  };

  const handleChangeInputChat = (e: any) => {
    setMessage({ ...message, value: e.target.value });
  };

  const handleSubmitMessage = (e: any) => {
    e.preventDefault();
    if (message.value) {
      socket.emit("message", message);
      setMessage({ ...message, value: "" });
    }
  };

  // Get All Friend List
  const friendList = useQuery({
    queryKey: ["friends"],
    queryFn: () => getFriendList({}),
  });

  // useEffect(() => {
  //   console.log(friendList);
  // }, [friendList]);

  return (
    <main className="container">
      <div className="p-3 shadow-sm rounded-3 mb-3 bg-dark text-center">
        <h3 className="text-white">I - Group</h3>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 user-list">
          {friendList && friendList.status === 'success' && friendList.data && <Users user={friendList.data} />}
        </div>
        <div className="col-12 col-md-8">
          <div className="bg-main h-100 rounded-3 mb-2">
            <Messages />
            <form action="" onSubmit={handleSubmitMessage}>
              <div className="bg-gray rounded-5 p-2 d-flex justify-content-between align-items-center mx-2">
                <button className="btn">
                  <Image
                    src="/image/file.png"
                    alt="friend name"
                    width={23}
                    height={23}
                  />
                </button>
                <input
                  type="text"
                  className="w-100 message-input"
                  onFocus={handleFocusInputChat}
                  onChange={handleChangeInputChat}
                  value={message.value}
                />
                <button type="submit" className="btn">
                  <Image
                    src="/image/send.png"
                    alt="friend name"
                    width={23}
                    height={23}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
