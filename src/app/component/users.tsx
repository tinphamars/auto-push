import User from "./user";

interface propType {
  user: any;
}

function Users({ user }: propType) {
  console.log(user.length);
  return (
    <ul className="list-group friend-list list-group-flush rounded-3">
      {user &&
        user.map((item: any) => (
          <>
            <User detail={item} />
          </>
        ))}
    </ul>
  );
}

export default Users;
