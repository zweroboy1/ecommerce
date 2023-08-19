import { Contacts } from './footer/Contacts';
import { MyAccount } from './footer/MyAccount';
import { Order } from './footer/Order';
import { Store } from './footer/Store';

const Footer = () => {
  return (
    <footer className="footer container">
      <div className="row">
        <Order />
        <Contacts />
        <Store />
        <MyAccount />
      </div>
    </footer>
  );
};

export { Footer };
