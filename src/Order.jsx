import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Order = ({
  token,
  setOrders,
  orders,
  setIsAuth,
  isAuth,
  setToken,
}) => {
  const [orderLoading, setOrderLoading] = useState(true);

  const FetchOrder = async () => {
    await fetch("http://127.0.0.1:8000/13/api-cart/order/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((js) => {
        setOrders(js.body);
        setOrderLoading(false);
      });
  };

  useEffect(() => {
    FetchOrder();
  }, []);

  if (orderLoading) {
    return <p>Загрузка...</p>;
  }

  const order = orders.map((order) => {
    return (
      <div className="col" key={order.id}>
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <p>Заказ №{order.id}</p>
            <h4 className="my-0 fw-normal">
              {order.products.map((product) => {
                return (
                  <div className="col" key={product.id}>
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{product.name}</h4>
                      </div>
                      <div className="card-body">
                        <h1 className="card-title pricing-card-title">
                          {product.price}р.
                          <small className="text-muted fw-light">
                            {" "}
                            &times; 2 шт.
                          </small>
                        </h1>
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">
              {order.order_price}р.
              <small className="text-muted fw-light"> &times; 1 шт.</small>
            </h1>
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
          <h1 className="display-4 fw-normal">Ваши заказы</h1>
        </div>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light">
          {order}
        </div>
      </main>
      <Footer />
    </div>
  );
};
