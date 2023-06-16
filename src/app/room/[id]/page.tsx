"use client";

import Image from "next/image";
import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

import Users from "../../component/users";
import Messages from "../../component/messages";
import { getFriendList } from "../../api/login";
import { useRouter } from "next/navigation";

interface Message {
  userId: string;
  value: string;
  roomId: string;
}

// Message type
interface MessageShow {
  userId: number;
  value: string;
}

export default function Room({ params }: { params: { id: string } }) {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState<Message>({
    userId: "",
    value: "",
    roomId: "",
  });

  const route = useRouter();

  const [user, setUser] = useState<any>(null);
  const [newMes, setNewMes] = useState<MessageShow | null>(null);
  const [fromServer, setFromServer] = useState<MessageShow[]>([]);

  const setupSocket = () => {
    const newSocket: any = io("http://localhost:7171", {
      withCredentials: true,
    });
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
  };

  useEffect(() => {
    setupSocket();
    // Set User
    const getUser = localStorage.getItem("user") || null;

    if (getUser) {
      setUser(JSON.parse(getUser));
    } else {
      route.push("/");
    }
    // End Set User

    setMessage({ ...message, roomId: params.id });

    return () => {
      socket && socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket &&
      socket.on("message", (data: MessageShow) => {
        setFromServer((old) => [...old, data]);
        setNewMes(data);
      });

    socket &&
      socket.emit("joinRoom", params.id, (error: any) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Joined room successfully");
        }
      });

    return () => {
      socket && socket.disconnect();
    };
  }, [socket, params]);

  const handleFocusInputChat = () => {
    socket && socket.emit("typing", "typing");
  };

  const handleChangeInputChat = (e: any) => {
    setMessage({ ...message, value: e.target.value, userId: user._id });
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
          {friendList && friendList.status === "success" && friendList.data && (
            <Users user={friendList.data} />
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
              {fromServer && (
                <Messages data={fromServer} user={user} ref={endRef} />
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
