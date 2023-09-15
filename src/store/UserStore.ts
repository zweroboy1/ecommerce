import { makeAutoObservable } from 'mobx';
import { CustomerWithToken } from '../types';
import { LocalStorageState } from '../services/localstorage';
import { getAnonymousUser } from '../services/commercetoolsApi';

class UserStore {
  private shadowIsAuth: boolean;

  private shadowUser: null | CustomerWithToken;

  private localStorageState: LocalStorageState;

  constructor() {
    this.shadowIsAuth = false;
    this.shadowUser = null;
    this.localStorageState = new LocalStorageState();
    this.getCustomerFromLS().then(() => {
      makeAutoObservable(this);
    });
  }

  async getCustomerFromLS() {
    const savedCustomer = this.localStorageState.getField('customer');
    if (savedCustomer) {
      this.shadowIsAuth = !!savedCustomer.user;
      this.shadowUser = savedCustomer;
    } else {
      const user = await getAnonymousUser();
      this.shadowIsAuth = false;
      this.shadowUser = user;
      this.localStorageState.setField('customer', this.shadowUser);
      this.localStorageState.saveState();
    }
    // eslint-disable-next-line no-console
    console.log(
      this.shadowIsAuth,
      this.shadowUser?.token,
      this.shadowUser?.user,
      this.shadowUser?.cart
    );
  }

  setIsAuth(value: boolean) {
    this.shadowIsAuth = value;
  }

  async setUser(value: null | CustomerWithToken) {
    if (value) {
      this.shadowUser = value;
    } else {
      const user = await getAnonymousUser();
      this.shadowUser = user;
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
