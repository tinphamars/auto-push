import Image from "next/image";

function Users() {
  return (
    <ul className="list-group friend-list list-group-flush rounded-3">
      <li className="list-group-item">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image
            src="/image/user-1.png"
            alt="friend name"
            width={65}
            height={65}
          />
          <div className="d-flex flex-lg-column">
            <span className="text-white fw-semibold">Danny Hopkins</span>
            <span className="text-gray">dannylove@gmail.com</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">10:15</span>
        </div>
      </li>
      <li className="list-group-item active">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image
            src="/image/user-2.png"
            alt="friend name"
            width={65}
            height={65}
          />
          <div className="d-flex flex-lg-column">
            <span className="text-white fw-semibold">Danny Hopkins</span>
            <span className="text-gray">dannylove@gmail.com</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">10:15</span>
        </div>
      </li>
      <li className="list-group-item">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image
            src="/image/user-1.png"
            alt="friend name"
            width={65}
            height={65}
          />
          <div className="d-flex flex-lg-column">
            <span className="text-white fw-semibold">Danny Hopkins</span>
            <span className="text-gray">dannylove@gmail.com</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">10:15</span>
        </div>
      </li>
      <li className="list-group-item">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image
            src="/image/user-3.png"
            alt="friend name"
            width={65}
            height={65}
          />
          <div className="d-flex flex-lg-column">
            <span className="text-white fw-semibold">Danny Hopkins</span>
            <span className="text-gray">dannylove@gmail.com</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">10:15</span>
        </div>
      </li>
      <li className="list-group-item">
        <div className="your-friend rounded-2 p-2 d-flex justify-content-between align-items-center">
          <Image
            src="/image/user-4.png"
            alt="friend name"
            width={65}
            height={65}
          />
          <div className="d-flex flex-lg-column">
            <span className="text-white fw-semibold">Danny Hopkins</span>
            <span className="text-gray">dannylove@gmail.com</span>
          </div>
          <span className="size-12 text-white fw-fw-semibold">10:15</span>
        </div>
      </li>
    </ul>
  );
}

export default Users;
