import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FacebookService } from 'ngx-facebook';

import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  signup = false;
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  password2 = '';
  
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private fbService: FacebookService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Web Facebook sdk
    this.fbService.init({
        appId: '245954362655647',
        version: 'v2.8'
    });
  }

  toggleType() {
    this.signup = !this.signup;
  }

  auth() {
    console.log('auth pressed');
    switch(this.signup) {
      case true:
        this.register()
        break;
      case false:
        this.login();
        break;
      default:
        this.login();
    }
  }

  login() {
    this.loading = true;
    if (this.username == '' || this.password == '') {
      this.presentError('Please provide a valid username and password.');
      this.loading = false;
    } else {
      this.userService.login(this.username, this.password)
        .subscribe(user => {
          console.log(user);
          this.router.navigate(['dashboard']);
          this.username = '';
          this.password = '';
          this.password2 = '';
          this.loading = false;
        });
    }
  }

  register() {
    this.loading = true;
    if (
      this.username === '' ||
      this.firstName === '' ||
      this.email === '' ||
      this.password === '' ||
      this.password2 === ''
    ) {
      this.presentError('Please provide a first name, email, and matching passwords.');
      this.loading = false;
    } else if (this.password !== this.password2) {
      this.presentError('The provided passwords do not match.')
      this.loading = false;
    } else {
      this.userService.register(
        this.username,
        this.firstName,
        this.lastName,
        this.email,
        this.password,
        this.password2
      )
        .subscribe(
          user => {
            console.log(user);
            this.username = '';
            this.firstName = '';
            this.lastName = '';
            this.email = '';
            this.password = '';
            this.password2 = '';
            this.loading = false;
            this.router.navigate(['dashboard']);
          },
          err => {
            console.log(err);
            this.presentError('Registration failed. Please try again.');
            this.loading = false;
          },
        );
    }
  }

  facebookLogin() {
    this.loading = true;
    this.fbService.login({ scope:'email, public_profile' })
      .then(res => {
        console.log(`fb returned response: ${res}`);
        const token = res.authResponse.accessToken;
        if (token) {
          this.userService.facebookAuth(token)
            .subscribe(
              user => {
                console.log(user);
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.password = '';
                this.password2 = '';
                this.loading = false;
                this.router.navigate(['dashboard']);
              },
              err => {
                console.log(err);
                this.loading = false;
                this.presentError(err.error.non_field_errors[0]);
              }
            );
        } else {
          this.presentError('Facebook auth failed. Please try again.');
          this.loading = false;
        }
      })
      .catch(err => {
        console.log(err);
        this.presentError('Facebook auth failed. Please try again.');
        this.loading = false;
      });
  }

  async presentError(message) {
    let alert = await this.alertCtrl.create({
      header: 'Login Failed',
      message: message,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
