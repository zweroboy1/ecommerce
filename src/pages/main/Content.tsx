import { AboutСompany } from './content/AboutСompany';
import { Promotions } from './content/Promotions';
import { Banners } from './content/Banners';
import { BestCategories } from './content/BestСategories';

const Content = () => {
  return (
    <main className="content container">
      <div className="row">
        <Banners />
        <BestCategories />
        <Promotions />
        <AboutСompany />
      </div>
    </main>
  );
};

export { Content };
