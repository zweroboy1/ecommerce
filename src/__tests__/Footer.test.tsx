import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from '../pages/main/Footer';

describe('Footer component', () => {
  it('renders order, contacts, store, and my account components', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const orderComponent = getByText('Покупательский сервис');
    const contactsComponent = getByText('Контакты');
    const storeComponent = getByText('Магазин');
    const myAccountComponent = getByText('Информация');

    expect(orderComponent).toBeInTheDocument();
    expect(contactsComponent).toBeInTheDocument();
    expect(storeComponent).toBeInTheDocument();
    expect(myAccountComponent).toBeInTheDocument();
  });
});
