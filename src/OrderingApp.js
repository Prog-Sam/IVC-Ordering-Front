import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Ordering/menu/home';
import Order from './components/Ordering/orders/order';
import OrderForm from './components/Ordering/orders/orderForm';
import OrderItemForm from './components/Ordering/catalog/orderItemForm';
import OrderItem from './components/Ordering/orders/orderItem';
import Status from './components/Ordering/status/status';
import StatusItem from './components/Ordering/status/statusItem';
import StatusItemForm from './components/Ordering/status/statusItemForm';

import NotFound from './components/CRUD/menu/notFound';
import Navigation from './components/Ordering/navigation/navigation';
import LoginForm from './components/CRUD/login/loginForm';
import UserContext from './context/userContext';
import CartContext from './context/cartContext';
import { getCurrentUser, logout } from './services/authService';
import { getCart, storeCart } from './services/cartService';
import ProtectedRoute from './common/protectedRoute';
import access from './config/accessConfig.json';
import FAQs from './components/Ordering/menu/faqs';
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

    // async function populateLocalCatalog() {
    //   const { data } = await getLocalCatalog();
    //   storeCatalog(data);
    // }

    function populateOrdersCount() {
      const cart = getCart();
      setOrdersCount(cart.length);
    }

    if (token) {
      setCurrentUser(getCurrentUser());
      // if (!getCatalog()) populateLocalCatalog();
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
          <main
            className='container'
            style={{ alignContent: 'flex-start', marginLeft: '10px' }}
          >
            {/* <div style={{ alignContent: 'stretch', marginLeft: '20px' }}> */}
            <Switch>
              <ProtectedRoute path='/orders/:id' component={OrderForm} />
              <ProtectedRoute path='/orders' component={Order} />
              <ProtectedRoute path='/orderItems/:id' component={OrderItem} />
              <ProtectedRoute path='/status' component={Status} />
              <ProtectedRoute path='/statusItems/:id' component={StatusItem} />
              <ProtectedRoute
                path='/catalogView/:id'
                component={StatusItemForm}
              />
              <ProtectedRoute path='/catalog/:id' component={OrderItemForm} />
              <ProtectedRoute path='/catalog' component={OrderItemForm} />
              <Route path='/faqs' component={FAQs} />
              <Route
                path='/login'
                render={(props) => <LoginForm {...props} />}
              />
              <Route path='/not-found' component={NotFound}></Route>
              <Route path='/' exact render={(props) => <Home {...props} />} />
              <Redirect to='/not-found' />
            </Switch>
          </main>
          {/* </div> */}
        </CartContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default OrderingApp;
