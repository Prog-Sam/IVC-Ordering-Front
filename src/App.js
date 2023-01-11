import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Supplier from './components/CRUD/supplier/supplier';
import Brand from './components/CRUD/brand/brand';
import OrderType from './components/CRUD/orderType/orderType';
import LensType from './components/CRUD/lensType/lensType';
import IndexType from './components/CRUD/indexType/indexType';
import ProductFamily from './components/CRUD/productFamily/productFamily';
import SupplyCategory from './components/CRUD/supplyCategory/supplyCategory';
import LensMaterial from './components/CRUD/lensMaterial/lensMaterial';
import LensItem from './components/CRUD/lensItem/lensItem';
import LensParam from './components/CRUD/lensParam/lensParam';
import ColorDay from './components/CRUD/colorDay/colorDay';
import FSCSAModel from './components/CRUD/fscsaModel/fscsaModel';
import FsItem from './components/CRUD/fsItem/fsItem';
import CSAItem from './components/CRUD/csaItem/csaItem';
import BranchType from './components/CRUD/branchType/branchType';
import Mall from './components/CRUD/mall/mall';
import Branch from './components/CRUD/branch/branch';
import Unit from './components/CRUD/unit/unit';
import TransactionType from './components/CRUD/transactionType/transactionType';
import TransactionSeries from './components/CRUD/transactionSeries/transactionSeries';
import User from './components/CRUD/user/user';
import Post from './components/CRUD/post/post';
import Home from './components/CRUD/menu/home';
import FAQs from './components/CRUD/menu/faqs';

import SupplierForm from './components/CRUD/supplier/supplierForm';
import BrandForm from './components/CRUD/brand/brandForm';
import OrderTypeForm from './components/CRUD/orderType/orderTypeForm';
import LensTypeForm from './components/CRUD/lensType/lensTypeForm';
import IndexTypeForm from './components/CRUD/indexType/indexTypeForm';
import ProductFamilyForm from './components/CRUD/productFamily/productFamilyForm';
import SupplyCategoryForm from './components/CRUD/supplyCategory/supplyCategoryForm';
import LensMaterialForm from './components/CRUD/lensMaterial/lensMaterialForm';
import LensItemForm from './components/CRUD/lensItem/lensItemForm';
import LensParamForm from './components/CRUD/lensParam/lensParamForm';
import ColorDayForm from './components/CRUD/colorDay/colorDayForm';
import FSCSAModelForm from './components/CRUD/fscsaModel/fscsaModelForm';
import FsItemForm from './components/CRUD/fsItem/fsItemForm';
import CSAItemForm from './components/CRUD/csaItem/csaItemForm';
import BranchTypeForm from './components/CRUD/branchType/branchTypeForm';
import MallForm from './components/CRUD/mall/mallForm';
import BranchForm from './components/CRUD/branch/branchForm';
import UnitForm from './components/CRUD/unit/unitForm';
import TransactionTypeForm from './components/CRUD/transactionType/transactionTypeForm';
import TransactionSeriesForm from './components/CRUD/transactionSeries/transactionSeriesForm';
import UserForm from './components/CRUD/user/userForm';
import PostForm from './components/CRUD/post/postForm';
import NotFound from './components/CRUD/menu/notFound';
import SystemSettings from './components/CRUD/menu/systemSettings';
import ItemSettings from './components/CRUD/menu/itemSettings';
import BranchSettings from './components/CRUD/menu/branchSettings';
import Navigation from './components/CRUD/navigation/navigation';
import LoginForm from './components/CRUD/login/loginForm';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import access from './config/accessConfig.json';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const { databaseEmp, management } = access;

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
            <ProtectedRoute
              path='/suppliers/:id'
              inclusion={management}
              component={SupplierForm}
            />
            <ProtectedRoute
              path='/brands/:id'
              inclusion={management}
              component={BrandForm}
            />
            <ProtectedRoute
              path='/ordertypes/:id'
              inclusion={management}
              component={OrderTypeForm}
            />
            <ProtectedRoute
              path='/lenstypes/:id'
              inclusion={management}
              component={LensTypeForm}
            />
            <ProtectedRoute
              path='/indextypes/:id'
              inclusion={management}
              component={IndexTypeForm}
            />
            <ProtectedRoute
              path='/productfamilies/:id'
              inclusion={management}
              component={ProductFamilyForm}
            />
            <ProtectedRoute
              path='/supplycategories/:id'
              inclusion={management}
              component={SupplyCategoryForm}
            />
            <ProtectedRoute
              path='/lensmaterials/:id'
              inclusion={management}
              component={LensMaterialForm}
            />
            <ProtectedRoute
              path='/lensItems/:id'
              inclusion={databaseEmp}
              component={LensItemForm}
            />
            <ProtectedRoute
              path='/lensparams/:id'
              inclusion={databaseEmp}
              component={LensParamForm}
            />
            <ProtectedRoute
              path='/colordays/:id'
              inclusion={management}
              component={ColorDayForm}
            />
            <ProtectedRoute
              path='/fscsamodels/:id'
              inclusion={management}
              component={FSCSAModelForm}
            />
            <ProtectedRoute
              path='/fsitems/:id'
              inclusion={databaseEmp}
              component={FsItemForm}
            />
            <ProtectedRoute
              path='/csaitems/:id'
              inclusion={databaseEmp}
              component={CSAItemForm}
            />
            <ProtectedRoute
              path='/branchtypes/:id'
              inclusion={management}
              component={BranchTypeForm}
            />
            <ProtectedRoute
              path='/malls/:id'
              inclusion={management}
              component={MallForm}
            />
            <ProtectedRoute
              path='/branches/:id'
              inclusion={management}
              component={BranchForm}
            />
            <ProtectedRoute
              path='/units/:id'
              inclusion={management}
              component={UnitForm}
            />
            <ProtectedRoute
              path='/transactiontypes/:id'
              inclusion={management}
              component={TransactionTypeForm}
            />
            <ProtectedRoute
              path='/transactionSeries/:id'
              inclusion={management}
              component={TransactionSeriesForm}
            />
            <ProtectedRoute
              path='/users/:id'
              inclusion={management}
              component={UserForm}
            />
            <ProtectedRoute
              path='/posts/:id'
              inclusion={management}
              component={PostForm}
            />
            {/*Routes for Non Form */}
            <Route path='/faqs' component={FAQs} />
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
            <Route
              path='/transactionseries'
              render={(props) => <TransactionSeries {...props} />}
            />
            <Route path='/posts' render={(props) => <Post {...props} />} />
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
