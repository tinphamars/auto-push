import Message from "./message";
import { forwardRef } from "react";

const Messages = forwardRef(function Messages({ data, user }: any, ref: any) {
  return (
    <div className="box-chat" ref={ref}>
      {data.length &&
        data.map((item: any, index: number) => (
          <Message key={index} mes={item} user={user} />
        ))}
    </div>
  );
});

export default Messages;
