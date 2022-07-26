import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/CRUD/menu/home';

import NotFound from './components/CRUD/menu/notFound';
import Navigation from './components/Ordering/navigation/navigation';
import LoginForm from './components/CRUD/login/loginForm';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
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

    function populateOrdersCount() {}

    if (token) {
      setCurrentUser(getCurrentUser());
      if (!getCatalog()) populateLocalCatalog();
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className='OrderingApp'>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation currentUser={currentUser} onLogout={handleLogout} />
        <ToastContainer />
        <main className='container'>
          <Switch>
            <Route path='/login' render={(props) => <LoginForm {...props} />} />
            <Route path='/not-found' component={NotFound}></Route>
            <Route path='/' exact render={(props) => <Home {...props} />} />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default OrderingApp;
