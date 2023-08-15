import { AUTH_ROUTE, DEFAULT_ROUTE, NOTFOUND_ROUTE, REGISTRATION_ROUTE } from './constants/route';
import { Auth } from './pages/Auth';
import { Main } from './pages/Main';
import { NotFound } from './pages/NotFound';
import { Registration } from './pages/Registration';

export const routes = [
  {
    path: DEFAULT_ROUTE,
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
];
