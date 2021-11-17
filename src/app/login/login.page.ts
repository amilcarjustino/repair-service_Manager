import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendConnectService, ResponseAuth } from '../services/backend-connect.service';
import { HttpResponseData } from '../models/HttpResponseData';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoginMode = true;

  constructor(
    private backendConnectService: BackendConnectService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authenticate(email, password);
  }

  authenticate(email: string, password: string) {
    this.backendConnectService.signInWithEmailAndPassword(
      email,
      password
    );
    this.router.navigate(['/']);
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
}
