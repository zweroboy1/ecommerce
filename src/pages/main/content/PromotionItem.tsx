import React from 'react';
import { NavLink } from 'react-router-dom';
import { PROMOTIONS_ROUTE } from '../../../constants/route';

interface Promotion {
  image: string;
  endDate: Date;
  description: string;
  code: string;
}

interface PromotionItemProps {
  promotion: Promotion;
}

const PromotionItem: React.FC<PromotionItemProps> = ({ promotion }) => {
  const calculateDaysRemaining = (endDate: Date) => {
    const currentDate = new Date();
    const timeDiff = endDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="promotions__item slide">
      <div className="promotions__item-wrapper">
        <div className="promotions__image">
          <NavLink to={PROMOTIONS_ROUTE} title="">
            <img className="promotions__pict" alt="promotion" title="" src={promotion.image} />
          </NavLink>
        </div>

        <div className="promotions__days">
          <div>Осталось</div>
          <span>{calculateDaysRemaining(promotion.endDate)}</span>
          <div>дней</div>
        </div>

        <div className="promotions__txt">
          <span className="promotions__text">{promotion.description}</span>
          <span className="promotions__code">{promotion.code}</span>
          <div className="promotions__date">по {promotion.endDate.toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
};

export default PromotionItem;
