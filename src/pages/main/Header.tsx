import { Search } from './header/Search';
import { Categories } from './header/Categories';
import { Logo } from './header/Logo';
import { Phone } from './header/Phone';
import { ComparedProducts } from './header/ComparedProducts';
import { Wishlist } from './header/Wishlist';
import { Account } from './header/Account';
import { Cart } from './header/Cart';

const TopLogo = () => {
  return (
    <div className="top-logo">
      <Logo />
    </div>
  );
};

const TopSearch = () => {
  return (
    <div className="top-search">
      <Categories />
      <Search />
      <Phone />
    </div>
  );
};

const TopButtons = () => {
  return (
    <div className="top-buttons">
      <ComparedProducts />
      <Wishlist />
      <Account />
      <Cart />
    </div>
  );
};

const Header = () => {
  return (
    <header className="header container">
      <div className="row">
        <TopLogo />
        <TopSearch />
        <TopButtons />
      </div>
    </header>
  );
};

export { Header };
