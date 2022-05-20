import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Supplier from './components/supplier';
import Brand from './components/brand';
import OrderType from './components/orderType';
import LensType from './components/lensType';
import IndexType from './components/indexType';
import ProductFamily from './components/productFamily';
import SupplyCategory from './components/supplyCategory';
import LensMaterial from './components/lensMaterial';
import LensItem from './components/lensItem';
import LensParam from './components/lensParam';
import ColorDay from './components/colorDay';
import FSCSAModel from './components/fscsaModel';
import FsItem from './components/fsItem';
import CSAItem from './components/csaItem';
import BranchType from './components/branchType';
import Mall from './components/mall';
import Branch from './components/branch';
import Unit from './components/unit';
import TransactionType from './components/transactionType';
import User from './components/user';
import Home from './components/home';

import SupplierForm from './components/supplierForm';
import BrandForm from './components/brandForm';
import OrderTypeForm from './components/orderTypeForm';
import LensTypeDetails from './components/lensTypeDetails';
import IndexTypeDetails from './components/indexTypeDetails';
import ProductFamilyDetails from './components/productFamilyDetails';
import SupplyCategoryDetails from './components/supplyCategoryDetails';
import LensMaterialDetails from './components/lensMaterialDetails';
import LensItemDetails from './components/lensItemDetails';
import LensParamDetails from './components/lensParamDetails';
import ColorDayDetails from './components/colorDayDetails';
import FSCSAModelDetails from './components/fscsaModelDetails';
import FsItemDetails from './components/fsItemDetails';
import CSAItemDetails from './components/csaItemDetails';
import BranchTypeForm from './components/branchTypeForm';
import MallForm from './components/mallForm';
import BranchForm from './components/branchForm';
import UnitDetails from './components/unitDetails';
import TransactionTypeDetails from './components/transactionTypeDetails';
import UserForm from './components/userForm';
import NotFound from './components/notFound';
import SystemSettings from './components/systemSettings';
import ItemSettings from './components/itemSettings';
import BranchSettings from './components/branchSettings';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className='App'>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation currentUser={currentUser} onLogout={handleLogout} />
        <ToastContainer />
        <main className='container'>
          <Switch>
            <ProtectedRoute path='/suppliers/:id' component={SupplierForm} />
            <ProtectedRoute path='/brands/:id' component={BrandForm} />
            <ProtectedRoute path='/ordertypes/:id' component={OrderTypeForm} />
            <ProtectedRoute path='/lenstypes/:id' component={LensTypeDetails} />
            <ProtectedRoute
              path='/indextypes/:id'
              component={IndexTypeDetails}
            />
            <ProtectedRoute
              path='/productfamilies/:id'
              component={ProductFamilyDetails}
            />
            <ProtectedRoute
              path='/supplycategories/:id'
              component={SupplyCategoryDetails}
            />
            <ProtectedRoute
              path='/lensmaterials/:id'
              component={LensMaterialDetails}
            />
            <ProtectedRoute path='/lensItems/:id' component={LensItemDetails} />
            <ProtectedRoute
              path='/lensparams/:id'
              component={LensParamDetails}
            />
            <ProtectedRoute path='/colordays/:id' component={ColorDayDetails} />
            <ProtectedRoute
              path='/fscsamodels/:id'
              component={FSCSAModelDetails}
            />
            <ProtectedRoute path='/fsitems/:id' component={FsItemDetails} />
            <ProtectedRoute path='/csaitems/:id' component={CSAItemDetails} />
            <ProtectedRoute
              path='/branchtypes/:id'
              component={BranchTypeForm}
            />
            <ProtectedRoute path='/malls/:id' component={MallForm} />
            <ProtectedRoute path='/branches/:id' component={BranchForm} />
            <ProtectedRoute path='/units/:id' component={UnitDetails} />
            <ProtectedRoute
              path='/transactiontypes/:id'
              component={TransactionTypeDetails}
            />
            <ProtectedRoute path='/users/:id' component={UserForm} />
            {/*Routes for Non Details */}
            <Route path='/login' render={(props) => <LoginForm {...props} />} />
            <Route
              path='/suppliers'
              render={(props) => <Supplier {...props} />}
            />
            <Route path='/brands' render={(props) => <Brand {...props} />} />
            <Route
              path='/ordertypes'
              render={(props) => <OrderType {...props} />}
            />
            <Route
              path='/lenstypes'
              render={(props) => <LensType {...props} />}
            />
            <Route
              path='/indextypes'
              render={(props) => <IndexType {...props} />}
            />
            <Route
              path='/productfamilies'
              render={(props) => <ProductFamily {...props} />}
            />
            <Route
              path='/supplycategories'
              render={(props) => <SupplyCategory {...props} />}
            />
            <Route
              path='/lensmaterials'
              render={(props) => <LensMaterial {...props} />}
            />
            <Route
              path='/lensItems'
              render={(props) => <LensItem {...props} />}
            />
            <Route
              path='/lensparams'
              render={(props) => <LensParam {...props} />}
            />
            <Route
              path='/colordays'
              render={(props) => <ColorDay {...props} />}
            />
            <Route
              path='/fscsamodels'
              render={(props) => <FSCSAModel {...props} />}
            />
            <Route path='/fsitems' render={(props) => <FsItem {...props} />} />
            <Route
              path='/csaitems'
              render={(props) => <CSAItem {...props} />}
            />
            <Route
              path='/branchtypes'
              render={(props) => <BranchType {...props} />}
            />
            <Route path='/malls' render={(props) => <Mall {...props} />} />
            <Route path='/branches' render={(props) => <Branch {...props} />} />
            <Route path='/units' render={(props) => <Unit {...props} />} />
            <Route
              path='/transactiontypes'
              render={(props) => <TransactionType {...props} />}
            />
            <Route path='/users' render={(props) => <User {...props} />} />
            <Route
              path='/system-settings'
              render={(props) => <SystemSettings {...props} />}
            />
            <Route
              path='/item-settings'
              render={(props) => <ItemSettings {...props} />}
            />
            <Route
              path='/branch-settings'
              render={(props) => <BranchSettings {...props} />}
            />
            <Route path='/not-found' component={NotFound}></Route>
            <Route path='/' exact render={(props) => <Home {...props} />} />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
