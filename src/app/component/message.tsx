import Image from "next/image";

function Message() {
  return (
    <>
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
            <span className="d-inline-block p-2 rounded-2 bg-gray-1">hi</span>
          </div>
          <div className="mt-1">
            <span className="d-inline-block p-2 rounded-2 bg-gray-1">
              what is your name
            </span>
          </div>
          <div className="mt-1">
            <span className="message-text bg-gray-1 p-2 rounded-2 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              alias praesentium! Perferendis, sit eum quod rem cum omnis quos
              placeat voluptas consequuntur molestias.
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
              alias praesentium! Perferendis, sit eum quod rem cum omnis quos
              placeat voluptas consequuntur molestias.
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
    </>
  );
}

export default Message;
