import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../store/Context';
import { publicRoutes, authRoutes } from '../routes';

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user?.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component()} />
        ))}
      {!user?.isAuth &&
        publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component()} />
        ))}
    </Routes>
  );
});

export { AppRouter };
