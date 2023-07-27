import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Basket from '../../pages/Basket';
import ConfirmOrder from '../../pages/ConfirmOrder';
import Error404 from '../../pages/Error404';
import LegalNotices from '../../pages/LegalNotices';
import LocalMarket from '../../pages/LocalMarket';
import Login from '../../pages/Login';
import Order from '../../pages/Order';
import OrdersList from '../../pages/OrdersList';
import Store from '../../pages/Store';
import Product from '../../pages/Product';
import Rgpd from '../../pages/Rgpd';
import SignInForm from '../../pages/SignInForm';
import Account from '../../pages/Account';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/account" element={<Account />} />
    <Route path="/sign-in" element={<SignInForm />} />
    <Route path="/local-market" element={<LocalMarket />} />
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Error404 />} />
    <Route path="/legal-notices" element={<LegalNotices />} />
    <Route path="/rgpd" element={<Rgpd />} />
    <Route path="/local-market/:store" element={<Store />} />
    <Route
      path="/local-market/category:name/store"
      element={<Store />}
    />
    <Route path="/local-market/:store/:product" element={<Product />} />
    <Route path="/local-market/basket" element={<Basket />} />
    <Route
      path="/local-market/order-checkout/confirmation"
      element={<ConfirmOrder />}
    />
    <Route path="/user/orders" element={<OrdersList />} />
    <Route path="/user/orders/:id" element={<Order />} />
  </Routes>
);

export default AppRoutes;
