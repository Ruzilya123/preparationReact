import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Register = ({ email, setEmail, password, setPassword, fio, setFio, setError, error, isAuth, setIsAuth, setToken }) => {
  const navigate = useNavigate();
  const Register = async (e) => {
    e.preventDefault();
    let back = await fetch("http://127.0.0.1:8000/13/api-cart/signup/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        fio: fio,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let js = await back.json();
    if (back.ok) {
      navigate("/login");
    } else {
      setError(js.error.message);
    }
  };
  return (
    <div className="container py-3">
      <header>
        <NavBar setIsAuth={setIsAuth} setToken={setToken} isAuth={isAuth} />
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Регистрация</h1>
        </div>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
          <div className="col">
            <div className="row">
              <form onSubmit={Register}>
                <h1 className="h3 mb-3 fw-normal">Пожалуйста заполните все поля</h1>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingFio"
                    placeholder="ФИО"
                    value={fio}
                    onChange={(e) => setFio(e.target.value)}
                  />
                  <label HtmlFor="floatingFio">ФИО</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <label HtmlFor="floatingInput">Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label HtmlFor="floatingPassword">Password</label>
                </div>
                {error}
                <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
                  Зарегистрироваться
                </button>
                <button
                  className="w-100 btn btn-lg btn-outline-info"
                  type="submit"
                  onClick={() => navigate("/")}
                >
                  Назад
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
