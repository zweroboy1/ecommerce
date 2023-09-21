import { Navigate } from 'react-router-dom';
import {
  AUTH_ROUTE,
  MAIN_ROUTE,
  PAYMENT_ROUTE,
  NOTFOUND_ROUTE,
  REGISTRATION_ROUTE,
  RETURN_ROUTE,
  CONTACTS_ROUTE,
  CART_ROUTE,
  ACCOUNT_ROUTE,
  ABOUT_ROUTE,
  PROMOTIONS_ROUTE,
  CATALOG_ROUTE,
  PRODUCT_ROUTE,
} from './constants/route';
import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { Payment } from './pages/Payment';
import { NotFound } from './pages/NotFound';
import { Registration } from './pages/Registration';
import { Return } from './pages/Return';
import { Contacts } from './pages/Contacts';
import { Cart } from './pages/Cart';
import { Account } from './pages/Account';
import { About } from './pages/About';
import { PromotionsAll } from './pages/PromotionsAll';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/product/ProductPage';

const commonRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: PAYMENT_ROUTE,
    Component: Payment,
  },
  {
    path: RETURN_ROUTE,
    Component: Return,
  },
  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
  },
  {
    path: PROMOTIONS_ROUTE,
    Component: PromotionsAll,
  },
  {
    path: `${CATALOG_ROUTE}/:category/:subcategory`,
    Component: Catalog,
  },
  {
    path: `${CATALOG_ROUTE}/:category`,
    Component: Catalog,
  },
  {
    path: CATALOG_ROUTE,
    Component: Catalog,
  },
  {
    path: `${PRODUCT_ROUTE}/:productId`,
    Component: ProductPage,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: NotFound,
  },
];

export const publicRoutes = [
  ...commonRoutes,
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: AUTH_ROUTE,
    Component: Auth,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: () => <Navigate to={AUTH_ROUTE} replace />,
  },
];

export const authRoutes = [
  ...commonRoutes,
  {
    path: REGISTRATION_ROUTE,
    Component: () => <Navigate to={MAIN_ROUTE} replace />,
  },
  {
    path: AUTH_ROUTE,
    Component: () => <Navigate to={MAIN_ROUTE} replace />,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: Account,
  },
];
