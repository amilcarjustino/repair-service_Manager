import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
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


  constructor(private http: HttpClient, private userStorage: Storage) {
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
    this.getStorage('userData').then(
      res=>{this.#user.next(res); console.log(res);},
      err => alert(JSON.stringify(err))
      );
    
    // this.#user.next(userData);
  }

  getStorage(key){
    return this.userStorage.get(key);
  }

  autoLogin() {
    const testValue = false;
    console.log(this.getUserStorageData());
    return from(this.getStorage('userData')).pipe(
      map(storedData => {
        console.log(storedData);
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          tokenExpirationDate: string;
          userId: string;
          email: string;
        };
        console.log(parsedData);
        const expirationTime = new Date(parsedData.tokenExpirationDate);
        if (expirationTime <= new Date()) {
          return null;
        }
        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token,
          expirationTime
        );
        console.log(user);
        return user;
      }),
      tap(user => {
        if (user) {
          this.#user.next(user);
          // this.autoLogout(user.tokenDuration);
        }
      }),
      map(user => !!user)
    );
  }


  logout() {
    // this.#userIsAuthenticated = true;
  }
}
