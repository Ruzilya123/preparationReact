import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Cart = ({ setToken, token, setCart, cart, setIsAuth, isAuth }) => {
  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(true);

  const FetchCart = async () => {
    console.log(token)
    await fetch("http://127.0.0.1:8000/13/api-cart/cart/", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    })
    .then((js) => {
      if (js) {
        setCart(js.body);
        setCartLoading(false);
        console.log(js)
      }
    });
  };

  useEffect(() => {
    FetchCart();
  }, []);

  function FetchOrder() {
    fetch("http://127.0.0.1:8000/13/api-cart/order/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate('/order');
    })
  };

  const removeFromCart = (id) => {
    fetch(`http://127.0.0.1:8000/13/api-cart/cart/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  };

  if (cartLoading) {
    return <p>Загрузка...</p>
  }

  console.log(cart)

  const cartCard = cart.map((carts) => {
    return (
      <div className="col" key={carts.id}>
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{carts.name}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">
              {carts.price}р.
              <small className="text-muted fw-light"> &times; 1 шт.</small>
            </h1>
            <p>{carts.description}</p>

            <button type="button" className="btn btn-lg btn-info mb-3">
              +
            </button>
            <button type="button" className="btn btn-lg btn-warning mb-3">
              &minus;
            </button>
            <button
              type="button"
              className="btn btn-lg btn-outline-danger mb-3"
              onClick={() => removeFromCart(carts.id)}
            >
              Удалить из корзины
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container py-3">
      <header>
        <NavBar setIsAuth={setIsAuth} setToken={setToken} isAuth={isAuth} />
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
          <h1 className="display-4 fw-normal">Корзина</h1>
        </div>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {cartCard}
        </div>
        <div className="row justify-content-center gap-1">
          <button
            className="col-6 btn btn-lg btn-outline-info mb-3"
            type="button"
            onClick={() => navigate("/")}
          >
            Назад
          </button>
          <button
            type="button"
            className="col-6 btn btn-lg btn-primary mb-3"
            onClick={() => FetchOrder()}
          >
            Оформить заказ
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};
