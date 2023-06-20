"user client";

import Image from "next/image";
interface propType {
  friendList: any;
  currentRoom: string | null;
  user?: any;
  changConversation: any;
  notify: { id: string; count: number | 0 }[];
}

function Users({
  friendList,
  currentRoom,
  user,
  changConversation,
  notify,
}: propType) {
  function getConversationName(name: string): string {
    let conversationName = "none";
    const abc = name.split("_");

    if (abc.length > 0) {
      abc.map((item) => {
        if (item !== user?.name) {
          conversationName = item;
        }
      });
    } else {
      conversationName = name;
    }

    return conversationName;
  }

  const handleClickChangeConversation = (id: string): void => {
    changConversation(id);
  };

  function countNotify(id: string): any {
    if (notify.length > 0 && notify.find((a: any) => a.id === id)) {
      let a = notify.find((a: any) => a.id === id);
      return a;
    } else {
      return null;
    }
  }

  return (
    <ul className="list-group friend-list list-group-flush rounded-3">
      {friendList &&
        friendList.map((item: any) => (
          <li
            className={
              currentRoom === item._id
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item._id}
            onClick={() => handleClickChangeConversation(item._id)}
          >
            <div className="your-friend rounded-3 p-1 d-flex justify-content-between align-items-center">
              <div className="">
                <Image
                  alt={item.name}
                  width={55}
                  height={55}
                  src={item.avatar ? item.avatar : "/image/user-1.png"}
                  className="rounded-circle"
                />
                <span className="text-white fw-semibold mx-2 text-capitalize size-12">
                  {getConversationName(item.name)}
                </span>
              </div>
              <span className="size-12 text-white-50 fw-fw-semibold">
                {"10:15"}
              </span>
            </div>
            {countNotify(item._id) && (
              <span className="count-notify">
                {countNotify(item._id).count}
              </span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Users;
