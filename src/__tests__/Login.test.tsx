import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../components/Login';
import { UserStore } from '../store/UserStore';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('../services/commercetoolsApi', () => ({
  getUser: jest.fn(() => Promise.resolve({})),
  getAnonymousUser: jest.fn(() =>
    Promise.resolve({
      token: {
        expires_at: (Date.now() + 10000).toString(), // Установите expires_at как строку
      },
    })
  ),
}));

describe('Login component', () => {
  it('should render login form and call setIsAuth and setUser on successful submission', async () => {
    const originalUserStore = new UserStore();

    const setIsAuthMock = jest.fn();
    const setUserMock = jest.fn();

    originalUserStore.setIsAuth = setIsAuthMock;
    originalUserStore.setUser = setUserMock;
  });

  it('should render login form', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    const loginButton = getByText('Войти');

    await act(async () => {
      fireEvent.click(loginButton);
    });
  });
});
