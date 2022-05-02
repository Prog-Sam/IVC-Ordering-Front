import { Route, Switch, Redirect } from 'react-router-dom';
import http from './services/httpService';
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

import SupplierDetails from './components/supplierDetails';
import BrandDetails from './components/brandDetails';
import OrderTypeDetails from './components/orderTypeDetails';
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
import BranchTypeDetails from './components/branchTypeDetails';
import MallDetails from './components/mallDetails';
import BranchDetails from './components/branchDetails';
import UnitDetails from './components/unitDetails';
import TransactionTypeDetails from './components/transactionTypeDetails';
import UserForm from './components/userForm';
import NotFound from './components/notFound';
import SystemSettings from './components/systemSettings';
import ItemSettings from './components/itemSettings';
import BranchSettings from './components/branchSettings';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Navigation />
      <ToastContainer />
      <main className='container'>
        <Switch>
          <Route
            path='/suppliers/:id'
            render={(props) => <SupplierDetails {...props} />}
          />
          <Route
            path='/brands/:id'
            render={(props) => <BrandDetails {...props} />}
          />
          <Route
            path='/ordertypes/:id'
            render={(props) => <OrderTypeDetails {...props} />}
          />
          <Route
            path='/lenstypes/:id'
            render={(props) => <LensTypeDetails {...props} />}
          />
          <Route
            path='/indextypes/:id'
            render={(props) => <IndexTypeDetails {...props} />}
          />
          <Route
            path='/productfamilies/:id'
            render={(props) => <ProductFamilyDetails {...props} />}
          />
          <Route
            path='/supplycategories/:id'
            render={(props) => <SupplyCategoryDetails {...props} />}
          />
          <Route
            path='/lensmaterials/:id'
            render={(props) => <LensMaterialDetails {...props} />}
          />
          <Route
            path='/lensItems/:id'
            render={(props) => <LensItemDetails {...props} />}
          />
          <Route
            path='/lensparams/:id'
            render={(props) => <LensParamDetails {...props} />}
          />
          <Route
            path='/colordays/:id'
            render={(props) => <ColorDayDetails {...props} />}
          />
          <Route
            path='/fscsamodels/:id'
            render={(props) => <FSCSAModelDetails {...props} />}
          />
          <Route
            path='/fsitems/:id'
            render={(props) => <FsItemDetails {...props} />}
          />
          <Route
            path='/csaitems/:id'
            render={(props) => <CSAItemDetails {...props} />}
          />
          <Route
            path='/branchtypes/:id'
            render={(props) => <BranchTypeDetails {...props} />}
          />
          <Route
            path='/malls/:id'
            render={(props) => <MallDetails {...props} />}
          />
          <Route
            path='/branchdetails/:id'
            render={(props) => <BranchDetails {...props} />}
          />
          <Route
            path='/units/:id'
            render={(props) => <UnitDetails {...props} />}
          />
          <Route
            path='/transactiontypes/:id'
            render={(props) => <TransactionTypeDetails {...props} />}
          />
          <Route
            path='/users/:id'
            render={(props) => <UserForm {...props} />}
          />
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
          <Route path='/csaitems' render={(props) => <CSAItem {...props} />} />
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
    </div>
  );
}

export default App;
