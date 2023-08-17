import { Navigate } from 'react-router-dom';
import {
  AUTH_ROUTE,
  DEFAULT_ROUTE,
  MAIN_ROUTE,
  NOTFOUND_ROUTE,
  REGISTRATION_ROUTE,
} from './constants/route';
import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Registration } from './pages/Registration';

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
  {
    path: AUTH_ROUTE,
    Component: Auth,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: NotFound,
  },
  {
    path: DEFAULT_ROUTE,
    Component: () => <Navigate to={NOTFOUND_ROUTE} replace />,
  },
];

export const authRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: () => <Navigate to={MAIN_ROUTE} replace />,
  },
  {
    path: AUTH_ROUTE,
    Component: () => <Navigate to={MAIN_ROUTE} replace />,
  },
  {
    path: NOTFOUND_ROUTE,
    Component: NotFound,
  },
  {
    path: DEFAULT_ROUTE,
    Component: () => <Navigate to={NOTFOUND_ROUTE} replace />,
  },
];
