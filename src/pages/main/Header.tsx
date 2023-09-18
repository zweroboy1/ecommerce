import { useContext } from 'react';
import { Context } from '../../store/Context';
import { Search } from './header/Search';
import { Categories } from './header/Categories';
import { Logo } from './header/Logo';
import { Phone } from './header/Phone';
// import { ComparedProducts } from './header/ComparedProducts';
// import { Wishlist } from './header/Wishlist';
import { Account } from './header/Account';
import { CartIcon } from './header/CartIcon';

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
  const { user } = useContext(Context);
  return (
    <div className="top-buttons">
      {/* <ComparedProducts /> */}
      {/* <Wishlist /> */}
      {user?.isAuth && <Account />}
      <CartIcon />
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
