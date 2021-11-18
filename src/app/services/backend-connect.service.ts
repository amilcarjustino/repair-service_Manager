import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sheet } from '../models/sheet';
import { environment } from '../../environments/environment';

import { Storage } from '@capacitor/storage';

export interface ResponseAuth {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BackendConnectService {
  isUserAuthenticated = false;
  userIdToken = '';
  firebaseToken = environment.firebaseConfig.webApiKey;
  refreshToken = '';
  expiresIn = '';
  userInfo;
  signinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.firebaseToken}`;
  databaseUrl = 'https://base-6c464.firebaseio.com/tests.json?auth=';

  constructor(private http: HttpClient, private storage: Storage) {}

  setToken(userIdToken, expiresIn) {
    this.storage.set({
      userIdToken,
      expiresIn,
    });
  }

  getTocken() {
    console.log(this.storage.get('userIdToken'));
    //this.userIdToken = response.idToken;
    //this.storage.get('userIdToken');
  }

  signInWithEmailAndPassword(email: string, password: string) {
    return this.http
      .post(this.signinUrl, { email, password, returnSecureToken: true })
      .subscribe((response: ResponseAuth) => {
        this.isUserAuthenticated = true;
        this.userIdToken = response.idToken;
        this.setToken(response.idToken, response.expiresIn);
      });
  }

  getList(userIdToken) {
    return this.http.get(this.databaseUrl + this.userIdToken);
    /* .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log('HTTP Error: ', err)
    ); */
  }

  /*  signInUser(email, password) {
    console.log('Hello in signinUser');
    this.http
      .post(this.signinEndpoint, { email, password, returnSecureToken: true })
      .subscribe(
        (data) => console.log('data:', data)
        //(err) => console.log('Error is: ', err.message)
      );
  } */

  getIsUserAuthenticated() {
    return {
      isUserAuthenticated: this.isUserAuthenticated,
      userIdToken: this.userIdToken,
    };
  }
  setIsUserAuthenticated() {
    this.isUserAuthenticated = true;
  }

  addNewSheet(sheet: Sheet) {
    console.log(environment.accessToken);
    this.http.post(this.databaseUrl, sheet).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
