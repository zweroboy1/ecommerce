import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';

describe('NotFound', () => {
  it('отображает текст ошибки и ссылку на главную страницу', () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );

    // Проверяем, что компонент отображает текст ошибки и ссылку на главную страницу
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Ошибка')).toBeInTheDocument();
    expect(screen.getByText('Извините! Мы не смогли найти то, что вы искали.')).toBeInTheDocument();

    // Проверяем, что ссылка ведет на главную страницу
    const linkElement = screen.getByRole('link', { name: 'Перейти на главную страницу' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/');
  });
});
