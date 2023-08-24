import { UserStore } from '../store/UserStore';

describe('Login component', () => {
  it('should render login form and call setIsAuth and setUser on successful submission', async () => {
    const originalUserStore = new UserStore();

    const setIsAuthMock = jest.fn();
    const setUserMock = jest.fn();

    originalUserStore.setIsAuth = setIsAuthMock;
    originalUserStore.setUser = setUserMock;
  });
});
