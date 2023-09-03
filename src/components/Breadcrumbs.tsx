import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb } from '../types';

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={breadcrumb.id}>
          {index > 0 && <span className="breadcrumbs__slash">/</span>}
          {index === breadcrumbs.length - 1 ? (
            <span className="breadcrumbs__current">
              <bdi>{breadcrumb.name}</bdi>
            </span>
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
