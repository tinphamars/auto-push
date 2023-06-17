"use client";

import Image from "next/image";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import Users from "../component/users";
import Messages from "../component/messages";
import { getConversation, getFriendList } from "../api/login";
import { useRouter } from "next/navigation";

interface Message {
  userId: string;
  value: string;
  roomId: string | null;
}

// Message type
interface MessageShow {
  userId: number;
  value: string;
}

export default function Chat() {
  const route = useRouter();
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<Message>({
    userId: "",
    value: "",
    roomId: "",
  });
  const [user, setUser] = useState<any>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [newMes, setNewMes] = useState<MessageShow | null>(null);
  const [fromServer, setFromServer] = useState<MessageShow[]>([]);

  const setupSocket = () => {
    const newSocket: any = io("http://localhost:7171", {
      withCredentials: true,
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
  };

  useEffect(() => {
    setupSocket();
    const getUser = localStorage.getItem("user") || null;

    if (getUser) {
      setUser(JSON.parse(getUser));
    } else {
      route.push("/");
    }

    socket &&
      socket.on("message", (data: MessageShow) => {
        setFromServer((old) => [...old, data]);
        setNewMes(data);
        console.log("client data",data);
      });

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  const handleFocusInputChat = () => {
    socket && socket.emit("typing", "typing");
  };

  const handleChangeInputChat = (e: any) => {
    setMessage({
      ...message,
      value: e.target.value,
      userId: user._id,
      roomId: roomId,
    });
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
    queryFn: () => getConversation(),
  });

  // HANDLE set id room
  const handleSetIdRoom = (id: string) => {
    setRoomId(id);
  };

  // Scroll to end of list message
  const endRef = useRef<HTMLElement>(null);
  const handelScroll = () => {
    if (endRef.current) {
      // endRef.current.scrollIntoView({ behavior: "smooth" });
      endRef.current.scrollTop = endRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (newMes && newMes.userId === user._id) {
      handelScroll();
    }
  }, [newMes, user]);
  // End scroll to end of list message

  return (
    <main className="container-sm">
      <div className="row">
        <div className="col-12 col-md-4 user-list">
          {user && (
            <div className="mb-2 text-center p-2 shadow-sm bg-white rounded-3">
              <Image
                alt="User profile image"
                width={100}
                height={100}
                src={user.avatar}
                className="rounded-circle"
              />
              <div className="mt-2 size-16 fw-semibold text-danger">
                <span className="text-capitalize">{user.name}</span>
              </div>
            </div>
          )}

          <div className="mb-3 position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Where is your friend"
            />
            <button className="btn-in-input" type="button">
              <Image
                alt="User profile image"
                width={16}
                height={16}
                src="/image/remove.png"
              />
            </button>
          </div>

          {friendList && friendList.status === "success" && friendList.data && (
            <Users
              friendList={friendList.data}
              user={user}
              changConversation={handleSetIdRoom}
              currentRoom={roomId}
            />
          )}
        </div>
        <div className="col-12 col-md-8 h-100vh">
          <div className="d-flex flex-column justify-content-between h-100">
            <div className="p-3 shadow-sm rounded-3 mb-2 bg-dark text-center">
              <h3 className="text-white text-capitalize">
                Your name: <span className="text-warning">{user?.name}</span>
              </h3>
            </div>
            <div className="flex-grow-1 flex-shrink-1 h-100 overflow-hidden bg-main rounded-3 mb-2">
              {fromServer && roomId ? (
                <Messages data={fromServer} user={user} ref={endRef} />
              ) : (
                <div className="text-center">
                  <h2 className="text-capitalize text-white pt-5">
                    Well come to free chat app
                  </h2>
                </div>
              )}
            </div>
            <div className="bg-gray-1 rounded-5 mb-1">
              <form action="" onSubmit={handleSubmitMessage}>
                <div className="bg-main rounded-5  p-2 d-flex justify-content-between align-items-center">
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
      </div>
    </main>
  );
}
