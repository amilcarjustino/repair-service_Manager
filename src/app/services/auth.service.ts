import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData';
import { User } from '../models/User';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  webApiKey = environment.firebaseConfig.webApiKey;
  signinUrl = environment.firebaseConfig.signinUrl;
  #user = new BehaviorSubject<User>(null);



  constructor(private http: HttpClient, private userStorage: Storage) {
    this.init();
  }

  async init() {
    await this.userStorage.create();
  }

  get userIsAuthenticated() {
    return this.#user.pipe(
      map((user) => {
        if (user) {
          return !!user.userToken;
        } else {
          return false;
        }
      })
    );
  }

  get token() {
    return this.#user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userToken;
        } else {
          return null;
        }
      })
    );
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.signinUrl + this.webApiKey, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(tap(authData => this.setUserData(authData)));
  }
  setUserData(authData: AuthResponseData) {
    const userData = new User(
      authData.email,
      authData.idToken,
      authData.localId,
      new Date(
        new Date().getTime() + +authData.expiresIn * 1000
      )
    );
    this.#user.next(userData);
    this.userStorage.set('userData', userData);
  }

  getUserStorageData() {
    // https://github.com/ionic-team/ionic-storage#api
    const userData = this.getStorage('userData');
    console.log(userData);
    // this.#user.next(userData);
  }

  async getStorage(key){
    return await this.userStorage.get(key);
  }


  logout() {
    // this.#userIsAuthenticated = true;
  }
}
