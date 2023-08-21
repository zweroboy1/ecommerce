import { AboutCompany } from './content/AboutCompany';
import { Promotions } from './content/Promotions';
import { Banners } from './content/Banners';
import { BestCategories } from './content/BestCategories';

const Content = () => {
  return (
    <main className="content">
      <div className="row">
        <Banners />
        <BestCategories />
        <Promotions />
        <AboutCompany />
      </div>
    </main>
  );
};

export { Content };
