import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Context } from './store/Context';
import { UserStore } from './store/UserStore';
import './assets/scss/style.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
