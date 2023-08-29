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
  PHONES_ROUTE,
  ELECTRONICS_ROUTE,
  VIDEO_GAMES_ROUTE,
  PHOTO_VIDEO_ROUTE,
  TELEVISIONS_ROUTE,
  SPORT_ROUTE,
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
} from './constants/route';
import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { Payment } from './pages/Payment';
import { NotFound } from './pages/NotFound';
import { Registration } from './pages/Registration';
import { Return } from './pages/Return';
import { PickupPoints } from './pages/PickupPoints';
import { GiftCertificates } from './pages/GiftCertificates';
import { Contacts } from './pages/Contacts';
import { Phones } from './pages/catalog/Phones';
import { Electronics } from './pages/Electronics';
import { VideoGames } from './pages/VideoGames';
import { PhotoVideo } from './pages/PhotoVideo';
import { Televisions } from './pages/Televisions';
import { Sport } from './pages/Sport';
import { Cart } from './pages/Cart';
import { AllOrders } from './pages/AllOrders';
import { Account } from './pages/Account';
import { Saved } from './pages/Saved';
import { Compare } from './pages/Compare';
import { Brands } from './pages/Brands';
import { SiteMap } from './pages/SiteMap';
import { Blog } from './pages/Blog';
import { About } from './pages/About';
import { PromotionsAll } from './pages/PromotionsAll';
import { Catalog } from './pages/Catalog';

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
    path: PHONES_ROUTE,
    Component: Phones,
  },
  {
    path: ELECTRONICS_ROUTE,
    Component: Electronics,
  },
  {
    path: VIDEO_GAMES_ROUTE,
    Component: VideoGames,
  },
  {
    path: PHOTO_VIDEO_ROUTE,
    Component: PhotoVideo,
  },
  {
    path: TELEVISIONS_ROUTE,
    Component: Televisions,
  },
  {
    path: SPORT_ROUTE,
    Component: Sport,
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
