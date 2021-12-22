import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData } from '../models/AuthResponseData';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  webApiKey = environment.firebaseConfig.webApiKey;
  signinUrl = environment.firebaseConfig.signinUrl;
  #user = new BehaviorSubject<User>(null);
  kk = new BehaviorSubject(null);


  constructor(private http: HttpClient) {}
  get userIsAuthenticated() {
    this.kk.subscribe(val=>console.log(val));
    this.#user.subscribe(val=>console.log(val));
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
    .pipe(tap(this.setUserData.bind(this)));
  }
  setUserData(authData: AuthResponseData) {
    console.log(authData);
  }

  logout() {
    // this.#userIsAuthenticated = true;
  }
}
