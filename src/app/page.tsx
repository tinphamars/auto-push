"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Users from "./component/users";

export default function Home() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const newSocket: any = io("http://localhost:7777");
    newSocket.on("connect", () => {
      console.log("success", "Socket Connected!");
    });
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  const handleFocusInputChat = () => {
    // Connect to the Socket.io server
    console.log("on focus input", socket);
    // socket.emit("typing_123", "typing");
  };

  return (
    <main className="container">
      <div className="p-3 shadow-sm rounded-3 mb-3 bg-dark text-center">
        <h3 className="text-white">I - Group</h3>
      </div>
      <div className="row">
        <div className="col-12 col-md-4">
          <Users />
        </div>
        <div className="col-12 col-md-8">
          <div className="bg-main h-100 rounded-3 mb-2">
            <div className="d-flex p-3 your-message">
              <div className="friend-avatar mr-15">
                <Image
                  src="/image/user-4.png"
                  alt="friend name"
                  width={30}
                  height={30}
                />
              </div>
              <div className="text-white">
                <div className="mt-1">
                  <span className="d-inline-block p-2 rounded-2 bg-gray-1">
                    hi
                  </span>
                </div>
                <div className="mt-1">
                  <span className="d-inline-block p-2 rounded-2 bg-gray-1">
                    what is your name
                  </span>
                </div>
                <div className="mt-1">
                  <span className="message-text bg-gray-1 p-2 rounded-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci, alias praesentium! Perferendis, sit eum quod rem
                    cum omnis quos placeat voluptas consequuntur molestias.
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex p-3 flex-row-reverse">
              <div className="friend-avatar ml-15">
                <Image
                  src="/image/user-2.png"
                  alt="friend name"
                  width={30}
                  height={30}
                />
              </div>
              <div className="text-white">
                <div className="mt-1 text-end">
                  <span className="message-text bg-gray p-2 rounded-2 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Adipisci, alias praesentium! Perferendis, sit eum quod rem
                    cum omnis quos placeat voluptas consequuntur molestias.
                  </span>
                </div>
                <div className="mt-1 text-end">
                  <span className="message-text bg-gray p-2 rounded-2 ">
                    What is your name
                  </span>
                </div>
                <div className="mt-1 text-end">
                  <span className="message-text bg-gray p-2 rounded-2 ">
                    what is your name
                  </span>
                </div>
              </div>
            </div>

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
              />
              <button type="button" className="btn">
                <Image
                  src="/image/send.png"
                  alt="friend name"
                  width={23}
                  height={23}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
