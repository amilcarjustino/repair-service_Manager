import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData';
import { User } from '../models/User';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  webApiKey = environment.firebaseConfig.webApiKey;
  signinUrl = environment.firebaseConfig.signinUrl;
  #user = new BehaviorSubject<User>(null);
  userObservable = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private userStorage: Storage,
    private router: Router) {
    this.init();
  }
  async init() {
    await this.userStorage.create();
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
    const expiryDate = new Date(
      new Date().getTime() + +authData.expiresIn * 1000
    );
    console.log(expiryDate);
    const userData = new User(
      authData.localId,
      authData.email,
      authData.idToken,
      expiryDate
    );
    this.setStorage('userData', userData);
    this.#user.next(userData);
    this.userObservable.next(userData);
  }

  setStorage(key, value) {
    this.userStorage.set(key, value).then(val => console.log('Stored:', val));;
  }


  getUserStorageData() {
    // https://github.com/ionic-team/ionic-storage#api
    return this.getStorage('userData').then(
      res => { this.#user.next(res); console.log(res); },
      err => alert(JSON.stringify(err))
    );
    // this.#user.next(userData);
  }


  getStorage(key) {
    return this.userStorage.get(key);
  }

  checkUserAuthenticated() {
    return  this.getUserStorageData().then(() => this.#user.value);
  }


  logout() {
    // this.#userIsAuthenticated = true;
    this.#user.next(null);
    this.setStorage('userData', null);
    this.router.navigateByUrl('/auth');
  }
}
