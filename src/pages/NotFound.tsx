import { NavLink, useNavigate } from 'react-router-dom';
import { MAIN_ROUTE } from '../constants/route';
import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main">
        <div className="exception">
          <div className="exception__code">
            404
            <span className="exception__code-txt">Ошибка</span>
          </div>
          <div className="exception__title-info">
            <h1 className="exception__title">Извините! Мы не смогли найти то, что вы искали.</h1>
            <p className="exception__info">Запрашиваемая страница не найдена.</p>
            <ul className="exception__links">
              <li className="exception__links-item">
                <NavLink to={MAIN_ROUTE} title="" className="exception__links-a">
                  Перейти на главную страницу
                </NavLink>
              </li>
              <li className="exception__links-item" id="go_back">
                <NavLink to="#" className="exception__links-a" onClick={goBack}>
                  Назад
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { NotFound };
