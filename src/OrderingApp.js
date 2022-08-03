import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/CRUD/menu/home';
import Order from './components/Ordering/orders/order';
import OrderForm from './components/Ordering/orders/orderForm';

import NotFound from './components/CRUD/menu/notFound';
import Navigation from './components/Ordering/navigation/navigation';
import LoginForm from './components/CRUD/login/loginForm';
import UserContext from './context/userContext';
import CartContext from './context/cartContext';
import { getCurrentUser, logout } from './services/authService';
import { getCart, storeCart } from './services/cartService';
import ProtectedRoute from './common/protectedRoute';
import access from './config/accessConfig.json';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {
  getLocalCatalog,
  getCatalog,
  storeCatalog,
} from './services/localCatalogService';

function OrderingApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const { databaseEmp } = access;

  useEffect(() => {
    let token = localStorage.getItem('token');

    async function populateLocalCatalog() {
      const { data } = await getLocalCatalog();
      storeCatalog(data);
    }

    function populateOrdersCount() {
      const cart = getCart();
      setOrdersCount(cart.length);
    }

    if (token) {
      setCurrentUser(getCurrentUser());
      if (!getCatalog()) populateLocalCatalog();
      if (!getCart()) storeCart([]);
      populateOrdersCount();
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className='OrderingApp'>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <CartContext.Provider value={{ ordersCount, setOrdersCount }}>
          <Navigation
            currentUser={currentUser}
            onLogout={handleLogout}
            ordersCount={ordersCount}
          />
          <ToastContainer />
          <main className='container'>
            <Switch>
              <ProtectedRoute path='/orders/:id' component={OrderForm} />
              <ProtectedRoute path='/orders' component={Order} />
              <Route
                path='/login'
                render={(props) => <LoginForm {...props} />}
              />
              <Route path='/not-found' component={NotFound}></Route>
              <Route path='/' exact render={(props) => <Home {...props} />} />
              <Redirect to='/not-found' />
            </Switch>
          </main>
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default OrderingApp;
