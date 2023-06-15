import Image from "next/image";
interface propType {
  user: any;
}

function Users({ user }: propType) {
  return (
    <ul className="list-group friend-list list-group-flush rounded-3">
      {user &&
        user.map((item: any) => (
          <li className="list-group-item active" key={item._id}>
            <div className="your-friend rounded-3 p-1 d-flex justify-content-between align-items-center">
              <div className="">
                <Image
                  alt={item.name}
                  width={55}
                  height={55}
                  src={item.avatar}
                  className="rounded-circle"
                />
                <span className="text-white fw-semibold mx-2 text-capitalize size-12">
                  {item.name}
                </span>
              </div>
              <span className="size-12 text-white fw-fw-semibold">
                {"10:15"}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Users;
