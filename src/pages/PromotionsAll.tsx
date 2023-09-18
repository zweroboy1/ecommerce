import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import PromotionItem from './main/content/PromotionItem';
import { BreadcrumbsPage } from '../components/BreadcrumbsPage';
import { promotionsData } from '../constants/promotionsData';

const PromotionsAll = () => {
  const breadcrumbs = [{ to: '.', text: 'Промоакции' }];

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main page container">
        <BreadcrumbsPage links={breadcrumbs} />
        <h1>Все акции</h1>
        <h3> Общая стоимость покупок вычисляется следующим образом:</h3>
        <ul>
          <li>Сначала для каждого товара применяется скидка (если она доступна).</li>
          <li>
            На основе скидки вычисляется стоимость каждого товара. Затем применяются промокоды.
          </li>
          <li>
            Каждый промокод рассматривается так, как будто другие промокоды не были использованы.
          </li>
          <li>Экономия вычисляется для каждого промокода отдельно, их эффект суммируется.</li>
        </ul>
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
