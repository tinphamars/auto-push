import Image from "next/image";

function User({ detail }: any) {
  console.log(detail);
  return (
    <>
      <li className="list-group-item">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image src={detail.avatar} alt={detail.name} width={65} height={65} />
          <div className="d-flex flex-column">
            <span className="text-white fw-semibold">{detail.name}</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">{"10:15"}</span>
        </div>
      </li>
    </>
  );
}

export default User;
