import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendConnectService, ResponseAuth } from '../services/backend-connect.service';
import { HttpResponseData } from '../models/HttpResponseData';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoginMode = true;

  constructor(
    private backendConnectService: BackendConnectService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    //console.log(!this.backendConnectService.getIsUserAuthenticated().isUserAuthenticated);
    /* if(!this.backendConnectService.getIsUserAuthenticated().isUserAuthenticated){
      this.router.navigateByUrl('/');
    } */
  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.authService.login();
    this.router.navigateByUrl('/home');
    const email = form.value.email;
    const password = form.value.password;
    // this.authenticate(email, password);
  }

  authenticate(email: string, password: string) {
    const result = this.backendConnectService.signInWithEmailAndPassword(
      email,
      password
    );
    console.log(result);
    //this.router.navigate(['/']);
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
