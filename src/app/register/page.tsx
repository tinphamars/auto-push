"use client";

import React, { useState } from "react";
import { register, userLogin } from "../api/login";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const route = useRouter();
  const handleSubmitLoginFrom = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const active: number = 1;
    const role_id: string = "6476ebe40ca86eacc96456f2";

    if (email && password) {
      register({ name, email, password, role_id, active, avatar })
        .then((user) => {
          if (user) {
            route.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSetEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSetPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSetFullName = (e: any) => {
    setName(e.target.value);
  };

  const handleSetAvatar = (e: any) => {
    setAvatar(e.target.value);
  };

  return (
    <main className="container">
      <div className="main-login">
        <div className="rounded-3 bg-white p-3 form-login">
          <div className="text-start mb-3">
            <Link href={"/"}>
              <button type="button" className="btn btn-outline-success">
                Log In
              </button>
            </Link>
          </div>

          <form action="" onSubmit={handleSubmitLoginFrom}>
            <div className="mb-3">
              <label htmlFor="exampleInputText_fullName" className="form-label">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={handleSetFullName}
                className="form-control"
                id="exampleInputText_fullName"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputText_email" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleSetEmail}
                className="form-control"
                id="exampleInputText_email"
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputText_password" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={handleSetPassword}
                className="form-control"
                id="exampleInputText_password"
                autoComplete="current-password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputText_avatar" className="form-label">
                Avatar
              </label>
              <input
                type="text"
                value={avatar}
                onChange={handleSetAvatar}
                className="form-control"
                id="exampleInputText_avatar"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn w-25 btn-outline-warning">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
