import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sheet } from '../models/Sheet';
import { environment } from '../../environments/environment';

//import { Storage } from '@capacitor/storage';
//import { Storage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Storage } from '@ionic/storage-angular';


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
  refreshToken = '';
  expiresIn = '';
  userInfo;
  databaseUrl = 'https://base-6c464.firebaseio.com/tests.json?auth=';
  private userStorage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.userStorage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.userStorage?.set(key, value);
  }

  setToken(userIdToken, expiresIn) {
    //this.set('userIdToken', userIdToken);
    this.storage.set('userIdToken', userIdToken);
    this.storage.set('expiresIn', expiresIn);
  }

  getTocken() {
    /*  return Storage.get({ key: 'userIdToken' }).then((data) => {
       this.isUserAuthenticated = true;
       console.log(this.isUserAuthenticated);
       console.log(data);
     }); */
    //this.userIdToken = response.idToken;
    //Storage.get('userIdToken');
    const name = this.storage.get('userIdToken');
  }

  /*
   https://github.com/ionic-team/ionic-storage#api  
  */

  

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
    console.log(this.userIdToken);
    this.http.post(this.databaseUrl + this.userIdToken, sheet).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
