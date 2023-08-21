import { makeAutoObservable } from 'mobx';
import { CustomerWithToken } from '../types';
import { LocalStorageState } from '../services/localstorage';

class UserStore {
  private shadowIsAuth: boolean;

  private shadowUser: null | CustomerWithToken;

  private localStorageState: LocalStorageState;

  constructor() {
    this.shadowIsAuth = false;
    this.shadowUser = null;
    this.localStorageState = new LocalStorageState();
    this.localStorageState.loadState();
    this.getCustomerFromLS();
    makeAutoObservable(this);
  }

  getCustomerFromLS() {
    const savedCustomer = this.localStorageState.getField('customer');
    if (savedCustomer) {
      this.shadowIsAuth = true;
      this.shadowUser = savedCustomer;
    }
  }

  setIsAuth(value: boolean) {
    this.shadowIsAuth = value;
  }

  setUser(value: null | CustomerWithToken) {
    this.shadowUser = value;
    this.localStorageState.setField('customer', value);
    this.localStorageState.saveState();
  }

  get isAuth() {
    return this.shadowIsAuth;
  }

  get user() {
    return this.shadowUser;
  }
}

export { UserStore };
