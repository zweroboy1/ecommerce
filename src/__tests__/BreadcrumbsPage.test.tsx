import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BreadcrumbsPage } from '../components/BreadcrumbsPage';

describe('BreadcrumbsPage component', () => {
  it('renders breadcrumbs correctly', () => {
    const links = [
      { to: '/page1', text: 'Page 1' },
      { to: '/page2', text: 'Page 2' },
    ];

    const { getByText, queryAllByText } = render(
      <MemoryRouter>
        <BreadcrumbsPage links={links} />
      </MemoryRouter>
    );

    // Проверяем, что каждая ссылка в хлебных крошках отображается
    expect(getByText('Главная')).toBeInTheDocument();
    expect(getByText('Page 1')).toBeInTheDocument();
    expect(getByText('Page 2')).toBeInTheDocument();

    // Используем queryAllByText для получения всех элементов с текстом "/"
    const slashes = queryAllByText('/');

    // Проверяем, что найдено два элемента с текстом "/"
    expect(slashes).toHaveLength(2);

    // Проверяем, что каждый из найденных элементов является элементом с классом "breadcrumbs__slash"
    slashes.forEach((slash) => {
      expect(slash).toHaveClass('breadcrumbs__slash');
    });
  });
});
