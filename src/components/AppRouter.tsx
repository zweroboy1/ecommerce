import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from '../routes';
import { DEFAULT_ROUTE } from '../constants/route';

const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component()} />
      ))}
      {/* <Navigate to={DEFAULT_ROUTE} /> */}
      <Route
        element={<Navigate to={DEFAULT_ROUTE} replace={true} />}
      />
    </Routes>
  );
};

export { AppRouter };
