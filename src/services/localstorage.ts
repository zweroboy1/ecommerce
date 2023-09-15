import { LOCALSTORAGE_NAME } from '../constants';
import { StateFields } from '../types';

const DEFAULT_STATE: StateFields = {};

class LocalStorageState {
  private fields: StateFields;

  constructor() {
    this.fields = this.loadState();
  }

  getField<K extends keyof StateFields>(name: K): StateFields[K] {
    return this.fields[name];
  }

  setField<K extends keyof StateFields>(name: K, value: StateFields[K]) {
    this.fields[name] = value;
  }

  saveState() {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(this.fields));
  }

  loadState(): StateFields {
    const storageItem = localStorage.getItem(LOCALSTORAGE_NAME);
    if (storageItem) {
      return { ...DEFAULT_STATE, ...JSON.parse(storageItem) };
    }

    return { ...DEFAULT_STATE };
  }
}

export { LocalStorageState };
