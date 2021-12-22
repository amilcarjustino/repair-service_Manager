import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userIsAuthenticated = false;

  constructor() { }

  login() {
    this.#userIsAuthenticated = true;
    console.log(this.#userIsAuthenticated);
  }

  logout() {
    this.#userIsAuthenticated = true;
  }

  get userIsAuthenticated(){
    return this.#userIsAuthenticated;
  }

}
