import { Link } from "react-router-dom";
import React from 'react';

export const NavBar = ({ setIsAuth, setToken, isAuth }) => {
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <Link to='/' className="d-flex align-items-center text-dark text-decoration-none">
        <span className="fs-4">«Just buy»</span>
      </Link>
      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {isAuth ? 
        <>
          <Link to='/order' className="me-3 py-2 text-dark text-decoration-none">Заказы</Link>
          <Link to='/cart' className="me-3 py-2 text-dark text-decoration-none">Корзина</Link>
          <Link to='/' className="me-3 py-2 text-dark text-decoration-none" onClick={() => {setIsAuth(false); setToken('')}}>Выйти</Link>
        </>
        :
        <>
          <Link to='/login' className="me-3 py-2 text-dark text-decoration-none">Авторизация</Link>
          <Link to='/register' className="me-3 py-2 text-dark text-decoration-none">Регистрация</Link>
        </>
        }
      </nav>
    </div>
  )
}
