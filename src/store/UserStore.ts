import { makeAutoObservable, runInAction } from 'mobx';
import { CustomerWithToken } from '../types';
import { LocalStorageState } from '../services/localstorage';
import { getAnonymousUser, getRefreshedToken } from '../services/commercetoolsApi';

class UserStore {
  private shadowIsAuth: boolean;

  private shadowUser: null | CustomerWithToken;

  private localStorageState: LocalStorageState;

  constructor() {
    this.shadowIsAuth = false;
    this.shadowUser = null;
    this.localStorageState = new LocalStorageState();
    this.getCustomerFromLS().then();
    makeAutoObservable(this);
  }

  async updateToken() {
    const savedCustomer = this.localStorageState.getField('customer');
    if (savedCustomer) {
      try {
        const refreshToken = savedCustomer.token.refresh_token;
        const result = await getRefreshedToken(refreshToken);
        savedCustomer.token = result;
        savedCustomer.token.refresh_token = refreshToken;
        this.setUser(savedCustomer);
      } catch {
        runInAction(() => {
          this.setUser(null);
        });
      }
    }
  }

  async getCustomerFromLS() {
    const savedCustomer = this.localStorageState.getField('customer');
    if (savedCustomer) {
      const tokenExpiresIn = Math.max(
        0,
        Number(savedCustomer.token.expires_at || 0) - Date.now() - 10000
      );
      setTimeout(() => this.updateToken(), tokenExpiresIn);
      runInAction(() => {
        this.shadowIsAuth = !!savedCustomer.user;
        this.shadowUser = savedCustomer;
      });
    } else {
      const user = await getAnonymousUser();
      runInAction(() => {
        this.shadowIsAuth = false;
        this.shadowUser = user;
      });
      const tokenExpiresIn = Math.max(0, Number(user?.token.expires_at || 0) - Date.now() - 10000);
      setTimeout(() => this.updateToken(), tokenExpiresIn);
      this.localStorageState.setField('customer', this.shadowUser);
      this.localStorageState.saveState();
    }
  }

  setIsAuth(value: boolean) {
    this.shadowIsAuth = value;
  }

  async setUser(value: null | CustomerWithToken) {
    if (value) {
      runInAction(() => {
        this.shadowUser = value;
      });
      const tokenExpiresIn = Math.max(0, Number(value.token.expires_at || 0) - Date.now() - 10000);
      setTimeout(() => this.updateToken(), tokenExpiresIn);
    } else {
      const user = await getAnonymousUser();
      runInAction(() => {
        this.shadowUser = user;
      });
    }
    this.localStorageState.setField('customer', this.shadowUser);
    this.localStorageState.saveState();
  }

  getUser() {
    return this.shadowUser;
  }

  get isAuth() {
    return this.shadowIsAuth;
  }

  get user() {
    return this.shadowUser;
  }
}

export { UserStore };
