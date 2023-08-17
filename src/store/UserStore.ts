import { makeAutoObservable } from 'mobx';

class UserStore {
  private shadowIsAuth: boolean;

  private shadowUser: null;

  constructor() {
    this.shadowIsAuth = true;
    this.shadowUser = null;
    makeAutoObservable(this);
  }

  setIsAuth(value: boolean) {
    this.shadowIsAuth = value;
  }

  setUser(value: null) {
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
