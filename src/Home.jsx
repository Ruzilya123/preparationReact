import React, { useEffect } from "react";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

export const Home = ({ setProducts, products, setLoading, setIsAuth, setToken, token, isAuth, loading }) => {
  const fetchData = async () => {
    setLoading(true);
    await fetch("http://127.0.0.1:8000/13/api-cart/products/")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.body);
      })
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const CartAdd = (product, id) => {
    fetch(`http://127.0.0.1:8000/13/api-cart/cart/${id}/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if(loading) {
    return <h1>Загрузка...</h1>
  }

    const CardWithProduct = products.map((product, id) => {
    return (
      <div className="col" key={product.id}>
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{product.name}</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">{product.price}p.</h1>
            <p>{product.description}</p>
            {isAuth ? (
              <button
                type="button"
                className="w-100 btn btn-lg btn-outline-primary"
                onClick={(e) => {CartAdd(product, product.id); e.currentTarget.classList.add('clicked')}}
              >
                Добавить в корзину
              </button>
            ) : null}
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
          <h1 className="display-4 fw-normal">Каталог товаров</h1>
        </div>
      </header>
      <main>
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {CardWithProduct}
        </div>
      </main>
      <Footer />
    </div>
  );
};
