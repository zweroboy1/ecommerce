import { makeAutoObservable } from 'mobx';
import { UserWithToken } from '../types';

class UserStore {
  private shadowIsAuth: boolean;

  private shadowUser: null | UserWithToken;

  constructor() {
    this.shadowIsAuth = false;
    this.shadowUser = null;
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.shadowIsAuth = value;
  }

  setUser(value: null | UserWithToken) {
    this.shadowUser = value;
  }

  get isAuth() {
    return this.shadowIsAuth;
  }

  get user() {
    return this.shadowUser;
  }
}

export { UserStore };
