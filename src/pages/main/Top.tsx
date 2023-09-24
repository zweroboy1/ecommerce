import { NavBar } from '../../components/NavBar';
import { TopLinks } from './top/TopLinks';

const Top = () => {
  return (
    <div className="top-panel container">
      <div className="row">
        <TopLinks />
        <NavBar />
      </div>
    </div>
  );
};

export { Top };
