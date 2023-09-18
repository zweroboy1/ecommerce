import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';
import PromotionItem from '../main/content/PromotionItem';
import { BreadcrumbsPage } from '../../components/BreadcrumbsPage';
import { promotionsData } from '../../constants/promotionsData';

const PromotionsAll = () => {
  const breadcrumbs = [{ to: '.', text: 'Промоакции' }];

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main page container">
        <BreadcrumbsPage links={breadcrumbs} />
        <h1>Все акции</h1>
        <div className="promotions__all">
          {promotionsData.map((promotion, index) => (
            <PromotionItem key={index} promotion={promotion} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { PromotionsAll };
