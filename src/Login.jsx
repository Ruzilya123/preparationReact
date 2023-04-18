import React from "react";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Login = ({ email, password, setEmail, setPassword, setIsAuth, setToken, setError, error, isAuth }) => {
  const navigate = useNavigate();
  const Login = async (e) => {
    e.preventDefault();
    let back = await fetch("http://127.0.0.1:8000/13/api-cart/login/", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let js = await back.json();
    if (back.ok) {
      setIsAuth(true);
      setToken(js.data.user_token);
      navigate("/");
      alert('Вы успешно зашли');
    } else {
      setError(js.error.message);
    }
  };
  return (
    <div className="container py-3">
      <header>
        <NavBar setIsAuth={setIsAuth} setToken={setToken} isAuth={isAuth} />
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Авторизация</h1>
        </div>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center justify-content-center">
          <div className="col">
            <div className="row">
              <form onSubmit={Login}>
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
                    onChange={(e) => setPassword(e.target.value)}
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                  />
                  <label HtmlFor="floatingPassword">Password</label>
                </div>
                <p>{error}</p>

                <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">
                  Войти
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
