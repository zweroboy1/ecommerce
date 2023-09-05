import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from '../types';
import { MAIN_ROUTE } from '../constants/route';

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="breadcrumbs">
      <NavLink className="breadcrumbs__link" to={MAIN_ROUTE}>
        Главная
      </NavLink>
      <span className="breadcrumbs__slash">/</span>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.id}>
          {index > 0 && <span className="breadcrumbs__slash">/</span>}
          {index === breadcrumbs.length - 1 ? (
            <NavLink className="breadcrumbs__current" to=".">
              {breadcrumb.name}
            </NavLink>
          ) : (
            <NavLink className="breadcrumbs__link" to={`/catalog/${breadcrumb.url}`}>
              {breadcrumb.name}
            </NavLink>
          )}
        </span>
      ))}
    </div>
  );
};

export { Breadcrumbs };
