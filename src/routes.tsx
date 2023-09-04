import { Navigate } from 'react-router-dom';
import {
  AUTH_ROUTE,
  MAIN_ROUTE,
  PAYMENT_ROUTE,
  NOTFOUND_ROUTE,
  REGISTRATION_ROUTE,
  RETURN_ROUTE,
  PICKUP_POINTS_ROUTE,
  GIFT_CERTIFICATES_ROUTE,
  CONTACTS_ROUTE,
  CART_ROUTE,
  ALL_ORDERS_ROUTE,
  ACCOUNT_ROUTE,
  SAVED_ROUTE,
  COMPARE_ROUTE,
  BRANDS_ROUTE,
  SITE_MAP_ROUTE,
  BLOG_ROUTE,
  ABOUT_ROUTE,
  PROMOTIONS_ROUTE,
  CATALOG_ROUTE,
  PRODUCT_ROUTE,
  PHONES_ROUTE,
} from './constants/route';
import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { Payment } from './pages/other/Payment';
import { NotFound } from './pages/NotFound';
import { Registration } from './pages/Registration';
import { Return } from './pages/other/Return';
import { PickupPoints } from './pages/other/PickupPoints';
import { GiftCertificates } from './pages/other/GiftCertificates';
import { Contacts } from './pages/other/Contacts';
import { Cart } from './pages/other/Cart';
import { AllOrders } from './pages/other/AllOrders';
import { Account } from './pages/Account';
import { Saved } from './pages/other/Saved';
import { Compare } from './pages/other/Compare';
import { Brands } from './pages/other/Brands';
import { SiteMap } from './pages/other/SiteMap';
import { Blog } from './pages/other/Blog';
import { About } from './pages/other/About';
import { PromotionsAll } from './pages/other/PromotionsAll';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/product/ProductPage';
import { Phones } from './pages/catalog/Phones';

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
    path: PICKUP_POINTS_ROUTE,
    Component: PickupPoints,
  },
  {
    path: GIFT_CERTIFICATES_ROUTE,
    Component: GiftCertificates,
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
    path: ALL_ORDERS_ROUTE,
    Component: AllOrders,
  },
  {
    path: SAVED_ROUTE,
    Component: Saved,
  },
  {
    path: COMPARE_ROUTE,
    Component: Compare,
  },
  {
    path: BRANDS_ROUTE,
    Component: Brands,
  },
  {
    path: SITE_MAP_ROUTE,
    Component: SiteMap,
  },
  {
    path: BLOG_ROUTE,
    Component: Blog,
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
  {
    path: PHONES_ROUTE,
    Component: Phones,
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
    Component: () => <Navigate to={REGISTRATION_ROUTE} replace />,
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
