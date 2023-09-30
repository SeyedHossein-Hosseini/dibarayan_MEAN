import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setLocalStorage(key: string, token: string) {
    localStorage.setItem(key, token);
  }

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

}
