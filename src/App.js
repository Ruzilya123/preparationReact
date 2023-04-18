import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { Order } from "./Order";

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fio, setFio] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                email={email}
                error={error}
                setError={setError}
                password={password}
                setToken={setToken}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setEmail={setEmail}
                setPassword={setPassword}
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                password={password}
                email={email}
                error={error}
                setError={setError}
                fio={fio}
                setToken={setToken}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                setEmail={setEmail}
                setPassword={setPassword}
                setFio={setFio}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                setLoading={setLoading}
                loading={loading}
                token={token}
                setToken={setToken}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
                products={products}
                setProducts={setProducts}
              />
            }
          />
          <Route
            path="/order"
            element={
              <Order
                token={token}
                setOrders={setOrders}
                orders={orders}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                token={token}
                setCart={setCart}
                cart={cart}
                isAuth={isAuth}
                setIsAuth={setIsAuth}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
