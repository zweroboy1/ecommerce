import Slider from './Slider';
import PromotionItem from './PromotionItem';
import { promotionsData } from '../../../constants/promotionsData';

const Promotions = () => {
  const promotionItems = promotionsData.map((promotion, index) => (
    <PromotionItem key={index} promotion={promotion} />
  ));

  return (
    <div className="promotions">
      <div className="row">
        <div className="promotions__container">
          <div className="promotions__title">Действующие акции</div>
          <Slider items={promotionItems} slideWidth={300} slideMargin={10} />
        </div>
      </div>
    </div>
  );
};

export { Promotions };
