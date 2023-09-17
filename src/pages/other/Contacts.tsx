import { Top } from '../main/Top';
import { Header } from '../main/Header';
import { Footer } from '../main/Footer';

const Contacts = () => {
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main page">
        <div className="breadcrumbs">
          <a href="/" className="breadcrumbs__link">
            <bdi>Главная</bdi>
          </a>
          <span className="breadcrumbs__slash">/</span>
          <a href="/contacts" className="breadcrumbs__link">
            <bdi>Контакты</bdi>
          </a>
        </div>
        <h1>Обратная связь</h1>
        <p>
          Если у вас возникли дополнительные вопросы или вам нужна дополнительная информация о
          доставке и оплате, пожалуйста, свяжитесь с нашей службой поддержки клиентов. Мы всегда
          готовы помочь вам.
        </p>
        <p>
          Мы ценим ваш выбор и стремимся обеспечить наилучший опыт покупок. Спасибо за то, что
          выбрали нас!
        </p>
        <div className="contacts__body">
          <div className="contacts__left">
            <h3>Адрес:</h3>
            <p>
              проспект Победы, 18, <br />
              Киев, Украина, 01135
            </p>
            <h3>Почта:</h3>
            <div>
              <a href="mailto:oopterator@rs.school">oopterator@rs.school</a>
            </div>
            <h3>Телефон:</h3>
            <p>+38 (111) 222-33-44</p>
          </div>
          <div className="contacts__right">
            <div>
              <h3>Рабочее время консультантов интернет-магазина:</h3>
              <p>10:00 — 18:00</p>
              <p>C понедельника по пятницу</p>
            </div>
          </div>
        </div>
        <div className="contacts__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10162.278077803514!2d30.46973943961182!3d50.44911855476979!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce7e15f21135%3A0xd559f9817926a199!2z0JHQuNC30L7QvQ!5e0!3m2!1sru!2str!4v1694863302594!5m2!1sru!2str"
            width="100%"
            height="400"
            allowFullScreen
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { Contacts };
