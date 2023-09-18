import React from 'react';
import { NavLink } from 'react-router-dom';
import { MAIN_ROUTE } from '../constants/route';

interface BreadcrumbsProps {
  links: { to: string; text: string }[];
}

const BreadcrumbsPage: React.FC<BreadcrumbsProps> = ({ links }) => {
  const breadcrumbs = [{ to: MAIN_ROUTE, text: 'Главная' }, ...links];

  return (
    <div className="breadcrumbs">
      {breadcrumbs.map((link, index) => (
        <React.Fragment key={link.to}>
          {index > 0 && <span className="breadcrumbs__slash">/</span>}
          <NavLink className="breadcrumbs__link" to={link.to}>
            <bdi>{link.text}</bdi>
          </NavLink>
        </React.Fragment>
      ))}
    </div>
  );
};

export { BreadcrumbsPage };
