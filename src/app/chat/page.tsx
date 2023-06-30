"use client";
       
import Image from "next/image";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";

import Users from "../component/users";
import Messages from "../component/messages";
import { getConversation, getMessageForRoom } from "../api/login";
import { useRouter } from "next/navigation";
import useSocket from "../customHook/connectSocket";

interface Message {
  userId: string;
  value: string;
  roomId: string | null;
}

// Message type
interface MessageShow {
  content: string;
  conversation_id: string;
  createdAt: string;
  is_remove: number;
  updatedAt: string;
  user_id: string;
  __v: number;
  _id: string;
}

interface Notify {
  id: string;
  count: number | 0;
}

interface HeightScroll {  
  prev: number;
  next: number;
}
let lastScroll: number = 0;

export default function Chat() {
  const route = useRouter();
  const socket = useSocket("http://localhost:7171");
  const [message, setMessage] = useState<Message>({
    userId: "",
    value: "",
    roomId: "",
  });
  const [user, setUser] = useState<any>(null);
  const [notify, setNotify] = useState<Notify[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [newMes, setNewMes] = useState<MessageShow | null>(null);
  const [fromServer, setFromServer] = useState<MessageShow[]>([]);
  const [heightScroll, setHeightScroll] = useState<HeightScroll>({
    prev: 0,
    next: 0,
  });

  useEffect(() => {
    const getUser = localStorage.getItem("user") || null;
    if (getUser) {
      setUser(JSON.parse(getUser));
    } else {
      route.push("/");
    }

    socket && socket.off("messageFromSever");

    socket &&
      socket.on("messageFromSever", (data: MessageShow) => {
        if (data.conversation_id === roomId) {
          setFromServer((old) => [...old, data]);
        } else {
          const nextNotifyList = [...notify];
          const existingNotifyItem = nextNotifyList.find(
            (a) => a.id === data.conversation_id
          );

          if (existingNotifyItem) {
            const updatedNotifyList = nextNotifyList.map((a) => {
              if (a.id === data.conversation_id) {
                a.count = a.count + 1;
              }
              return a;
            });

            setNotify(updatedNotifyList);
          } else {
            setNotify((old) => [
              ...old,
              { id: data.conversation_id, count: 1 },
            ]);
          }
        }
        setNewMes(data);
      });
  }, [socket, roomId, notify, route]);

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
    setNotify(notify.filter((a) => a.id !== id));
  };

  // Scroll to end of list message
  const endRef = useRef<HTMLElement>(null);
  const handelScroll = () => {
    if (endRef.current) {
      endRef.current.scrollTop = endRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    if (newMes && newMes.user_id === user._id) {
      handelScroll();
    }
  }, [newMes, user]);

  // GET message from server
  useEffect(() => {
    roomId &&
      getMessageForRoom(roomId).then((data) => {
        setFromServer(data);
        setTimeout(() => {
          handelScroll();
        }, 300);
      });
  }, [roomId]);

  // HANDEL SCROLL : scroll to the top call api again
  const currentScrollRef = useRef<number>(0);
  const handleScroll = (top: number) => {
    const check: Boolean = checkScrollUp(top);

    if (check && top === 0) {
      console.log("scroll to end", endRef.current?.scrollTop);

      if (endRef.current) {
        const {
          scrollHeight,
        }: {
          scrollHeight: number;
        } = endRef.current;
        setHeightScroll((old) => ({ prev: old.next, next: scrollHeight }));
      }

      getMessageForRoom("648d3a23eb33149a6fb66dac").then((data) => {
        if (data) {
          setFromServer((old) => [...data, ...old]);
          setTimeout(() => {
            if (endRef.current) {
              const {
                scrollHeight,
              }: {
                scrollHeight: number;
              } = endRef.current;
              setHeightScroll((old) => ({
                prev: old.next,
                next: scrollHeight,
              }));
            }
          }, 100);
        }
      });
    }
  };

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollTop = heightScroll.next - heightScroll.prev;
    }
  }, [heightScroll]);

  const checkScrollUp = (scrollNumber: number): boolean => {
    if (scrollNumber > 0 && lastScroll <= scrollNumber) {
      lastScroll = scrollNumber;
      return false;
    } else {
      lastScroll = scrollNumber;
      return true;
    }
  };

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
              notify={notify}
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
                <Messages
                  data={fromServer}
                  user={user}
                  ref={endRef}
                  handleScroll={handleScroll}
                />
              ) : (
                <div className="text-center">
                  <h2 className="text-capitalize text-white pt-5">
                    Well come to free chat app
                  </h2>
                </div>
              )}
            </div>
            {roomId && (
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
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
