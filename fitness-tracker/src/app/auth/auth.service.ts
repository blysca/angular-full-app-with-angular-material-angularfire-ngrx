import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private router: Router
  ) { }

  registerUser(authData: AuthData){
    this.user= {
      email: authData.email,
      userId: Math.round(Math.random() * 10010).toString()
    };
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user= {
      email: authData.email,
      userId: Math.round(Math.random() * 10010).toString()
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authException();
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user !== null;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  private authException() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
}
