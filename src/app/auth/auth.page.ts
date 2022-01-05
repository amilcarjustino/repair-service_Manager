import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BackendConnectService,
  ResponseAuth,
} from '../services/backend-connect.service';
import { AuthResponseData } from '../models/AuthResponseData';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.getUserStorageData();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
    //form.reset();
  }

  authenticate(email: string, password: string) {
    const result = this.authService.signInWithEmailAndPassword(
      email,
      password
    ).subscribe((data) => { this.router.navigate(['/']); });

    /*
    console.log('email: ', email);
    console.log('password: ', password);
    if (this.isLoginMode) {
      const authObs = this.backendConnectService.signInWithEmailAndPassword(
        email,
        password
      );
      authObs.subscribe((data: ResponseAuth) => {
        console.log('ResponseData', data);
        if (data) {
          console.log('data.idToken', data.idToken);
          this.backendConnectService.setIsUserAuthenticated(data);
          this.router.navigate(['/']);
        }
      });
    }
  } */
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  testButton() {
    //const user = this.authService.checkUserAuthenticated();
    //console.log(user);

    this.authService.testStorage();
    console.log('Done');

    //this.authService.authenticatedUser();
    // console.log(user.userToken);
    // const isAuth = this.authService.userIsAuthenticated.subscribe((isAuth_) => console.log(isAuth_));
    // const test = this.authService.userIsAuthenticated;
    // console.log(test);
    //const test = this.authService.autoLogin();
    //console.log(test);
  }
}
