"use client";

import React, { useState } from "react";
import { userLogin } from "./api/login";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const route = useRouter();
  const handleSubmitLoginFrom = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email && password) {
      userLogin({ email, password })
        .then((user) => {
          if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            route.push("/chat");
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

  return (
    <main className="container">
      <div className="main-login">
        <div className="rounded-3 bg-white p-3 form-login">
          <form action="" onSubmit={handleSubmitLoginFrom}>
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
            <div className="text-center">
              <button type="submit" className="btn w-25 btn-outline-warning">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
