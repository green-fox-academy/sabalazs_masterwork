import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import PlaceOrder from './components/place-order/PlaceOrder';
import PreviousOrders from './components/previous-orders/PreviousOrders';
import { SignUp } from './components/auth/SignUp';
import PrivateRoute from './components/PrivateRoute';
import AdminOrders from './components/admin/orders/AdminOrders';
import AdminProducts from './components/admin/products/AdminProducts';
import Dashboard from './components/Dashboard';
import AdminNewProduct from './components/admin/products/AdminNewProduct';
import AdminEditProduct from './components/admin/products/AdminEditProduct';
import { initialState, reducer } from './reducer';
import AuthContext from './AuthContext';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (

    <Router>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <Switch>
          <PrivateRoute path="/order" component={PlaceOrder} />
          <PrivateRoute path="/previous-orders" component={PreviousOrders} />
          <PrivateRoute path="/admin/orders" component={AdminOrders} />
          <PrivateRoute path="/admin/products" component={AdminProducts} />
          <PrivateRoute path="/admin/new-product" component={AdminNewProduct} />
          <PrivateRoute path="/admin/edit-product/:productId" component={AdminEditProduct} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}
