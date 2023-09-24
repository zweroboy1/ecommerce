import { Top } from './main/Top';
import { Header } from './main/Header';
import { Footer } from './main/Footer';
import zweroboy from '../assets/img/zweroboy1.jpeg';
import mila from '../assets/img/mila.jpeg';
import nyurasheva from '../assets/img/nyurasheva1.jpg';
import rs1 from '../assets/svg/HelpingHandSloth.svg';
import rs2 from '../assets/svg/im-fine.svg';
import edu from '../assets/svg/mortarboard.svg';
import { BreadcrumbsPage } from '../components/BreadcrumbsPage';

const About = () => {
  const breadcrumbs = [{ to: '.', text: 'О нас' }];
  const teamMembers = [
    {
      name: 'Алексей Роман',
      role: 'Тимлид',
      bio: 'Увлеченный фронтенд-разработчик с огромным желанием учиться и расти в совместной командной среде.',
      details:
        'Алексей руководил всем процессом разработки, активно координируя работу всех членов команды. Он следил за выполнением задач и обеспечивал эффективное взаимодействие между нами.',
      education: [
        {
          university: 'Лицей информационных технологий',
          speciality: 'ООПератор ПК',
          description: '',
          date: '1998 2001',
        },
        {
          university: 'Днепропетровский национальный университет',
          speciality: 'Органическая химия',
          description: 'Магистр по органической химии, химик, преподаватель химии.',
          date: '2001 2006',
        },
        {
          university: 'EPAM R&D Lab',
          speciality: 'Frontend Developer',
          date: '2021 2022',
        },
      ],
      job: 'заведующий химико-аналитической лабораторией, программист php на фрилансе, создатель и владелец собственных сайтов.',
      project: [
        'Настройка репозитория и доски задач',
        'Вход пользователя',
        'Отображение списка продуктов и цен',
        'Фильтрация, сортировка и поиск товаров',
        'Переключение между категориями',
        'Пагинация',
        'Применение промокода',
      ],
      github: 'zweroboy1',
      photo: zweroboy,
    },
    {
      name: 'Мила Божевская',
      role: 'Frontend-разработчик',
      bio: 'Мотивированный фронтенд-разработчик с широким опытом создания удобных пользовательских интерфейсов и разработки адаптивного дизайна.',
      details:
        'Мила привнесла в проект свой опыт в создании удобных пользовательских интерфейсов и разработке адаптивного дизайна. Ее умение быстро осваивать новые технологии и коммуникабельность сделали ее ценным членом команды.',
      education: [
        {
          university: 'Херсонский национальный технический университет',
          speciality: 'Компьютерная инженерия',
          description: 'Магистр по обслуживанию компьютерных и интеллектуальных систем и сетей',
          date: '2012 2017',
        },
        {
          university: 'Loftschool',
          speciality: 'Веб-разработчик',
          description: '',
          date: '2019 2020',
        },
      ],
      job: 'frontend-разработчик, программист.',
      project: [
        'Навигация по страницам и роутинг приложения',
        'Внедрение mobx для сохранения состояний приложения',
        'Регистрация',
        'Аккаунт пользователя',
        'Реализация корзины',
        'Добавление и удаление товара в корзину',
      ],
      github: 'milabozhevskaya',
      photo: mila,
    },
    {
      name: 'Анастасия Юрашева',
      role: 'Frontend-разработчик',
      bio: 'Начинающий фронтенд-разработчик с готовностью к новым вызовам и стремлением совершенствовать свои навыки вместе с командой.',
      details:
        'Анастасия проявила себя как быстро обучающийся и амбициозный участник. Умение обучаться и стремление к росту позволили ей эффективно справляться с разнообразными задачами и вносить новые идеи в проект.',
      education: [
        {
          university: 'Днепропетровский национальный университет',
          speciality: 'Математика',
          description: 'Математик, преподаватель математики.',
          date: '2003 2008',
        },
        {
          university: 'Классический частный университет',
          speciality: 'Программное обеспечение автоматизированных систем',
          description:
            'Магистр в области программного обеспечения автоматизированных систем, инженер-программист.',
          date: '2003 2009',
        },
        {
          university: 'Высшая школа экономики',
          speciality: 'Бизнес-информатика',
          description: 'Программа переподготовки.',
          date: '2014 2015',
        },
      ],
      job: 'руководитель проектов по автоматизации, аналитик, специалист C&B, администратор сайтов, бухгалтер системы электронных платежей, системный администратор.',
      project: [
        'Верстка сайта',
        'Фильтрация и сортировка товаров',
        'Реализация модальных окон и дропдауна',
        'Реализация слайдеров',
        'Главная страница',
        'Страница "О нас"',
      ],
      github: 'nyurasheva',
      photo: nyurasheva,
    },
  ];
  return (
    <div className="tygh">
      <Top />
      <Header />
      <main className="main page about container">
        <BreadcrumbsPage links={breadcrumbs} />
        <h1>О нас</h1>
        <div className="about__as">
          <div>
            <p>Мы представляем команду ООПтераторы!</p>
            <p>
              В ходе работы над этим проектом у нас сложилась очень дружная команда из трех
              разработчиков разной степени подготовки, но обладающих огромным желанием учиться и
              создать интересный интернет-магазин.
            </p>
            <p>
              Благодаря пониманию сильных сторон друг друга и четкому распределению обязанностей,
              нам удалось успешно завершить все этапы проекта.
            </p>
            <p>
              Каждый член команды активно участвовал в обсуждении задач, принося свой вклад в поиск
              наилучших решений.
            </p>
            <p>
              Именно совместный труд, взаимопонимание, открытый обмен мнениями и идеями позволили
              нам достичь высокого качества и своевременного выполнения данного проекта.
            </p>
            <p>
              В ходе работы возник коллектив единомышленников, в котором открытый обмен мнениями и
              информацией, атмосфера взаимопомощи и поддержки стала фундаментом нашего успеха и
              позволила достичь поставленных целей.
            </p>
          </div>
          <div className="about__rs-img">
            <img src={rs1} alt="RS Image" />
            <img src={rs2} alt="RS Image" />
          </div>
        </div>
        <h2>Члены команды</h2>
        <div className="about__team">
          {teamMembers.map((member) => (
            <div className="about__member" key={member.name}>
              <div className="about__photo">
                <img className="about__img" src={member.photo} alt={member.name} />
                <div className="education">
                  <div className="education__list">
                    <div className="education__item">
                      {Array.isArray(member.education) &&
                        member.education.map((item, index) => (
                          <div className="education__block" key={index}>
                            <div className="education__content">
                              <h2 className="education__title">{item.university}</h2>
                              <h3 className="education__speciality">
                                <span className="education__p">{item.speciality}</span>
                              </h3>
                              <p className="education__descr">{item.description}</p>
                            </div>
                            <div className="education__img">
                              <div className="education__wrapp-img">
                                <img className="education__svg" src={edu} alt="икона" />
                              </div>
                            </div>
                            <span className="education__date">{item.date}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="about__person">
                <h4 className="about__name">{member.name}</h4>
                <a
                  href={`https://github.com/${member.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about__github"
                >
                  <span role="img" aria-label="github" className="anticon anticon-github">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="github"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                    </svg>
                  </span>
                  {member.github}
                </a>
                <p className="about__role">{member.role}</p>
                <div className="about__details">
                  <p>{member.bio}</p>
                </div>
                <div className="about__details">
                  <p>
                    <span>Опыт работы: </span>
                    {member.job}
                  </p>
                </div>
                <div className="about__details">
                  <p>
                    <span>На проекте:</span>
                  </p>
                  <ul>
                    {Array.isArray(member.project) ? (
                      member.project.map((project, index) => <li key={index}>{project}</li>)
                    ) : (
                      <li>{member.project}</li>
                    )}
                  </ul>
                </div>
                <div className="about__details">
                  <p>{member.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2>
          Спасибо
          <a className="rs-link" href="https://rs.school/" target="_blank">
            <svg className="rs-link__svg"></svg>
          </a>
          за курс JavaScript/Front-end 2023Q1!
        </h2>
        <div>
          <p>
            Мы благодарны за то, что совместная работа помогла каждому из нас повысить свой
            профессиональный уровень и ощутить все преимущества коллективного творчества.
          </p>
        </div>
        <p>Надеемся, что вам понравился наш финальный проект.</p>
      </main>
      <Footer />
    </div>
  );
};

export { About };
