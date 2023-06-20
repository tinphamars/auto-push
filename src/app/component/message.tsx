import Image from "next/image";

function Message({ mes, user }: any) {
  return (
    <>
      {mes.user_id === user._id ? (
        <div className="d-flex flex-row-reverse mb-1">
          <div className="friend-avatar"></div>
          <div className="text-white flex-grow-1">
            <div className="text-end">
              <div className="message-text right">{mes.content}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex your-message mb-1">
          <div className="friend-avatar mr-15">
            <Image
              src="/image/user-4.png"
              alt="friend name"
              width={30}
              height={30}
            />
          </div>
          <div className="text-white flex-grow-1">
            <div className="">
              <span className="message-text left">{mes.content}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;
