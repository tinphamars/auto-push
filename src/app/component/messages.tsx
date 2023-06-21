import Message from "./message";
import { forwardRef } from "react";

const Messages = forwardRef(function Messages(
  { data, user, handleScroll }: any,
  ref: any
) {
  const handleScrollToTop = (event: React.UIEvent<HTMLDivElement>): void => {
    const { scrollTop } = event.currentTarget;
    handleScroll(scrollTop);
  };

  return (
    <div className="box-chat" ref={ref} onScroll={handleScrollToTop}>
      {data.length &&
        data.map((item: any, index: number) => (
          <Message key={index} mes={item} user={user} />
        ))}
    </div>
  );
});

export default Messages;
