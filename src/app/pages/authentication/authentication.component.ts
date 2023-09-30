import { Component } from '@angular/core';
import { AthenticationService } from '../../services/auth/athentication.service';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';

import { User } from '../../schemas/authentication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  constructor(
    private authService: AthenticationService,
    private router: Router,
    private localstorage: LocalstorageService
  ) {}


  username: string = '';
  password: string = '';
  token: string = '';
  userId: string = '';
  errorMessage: string = '';

  login(user: User): void {
    if (!user.password || !user.username) {
      this.errorMessage = 'Please insert username and password !!!';
    } else {
      console.log(user);
      this.authService.loginService(user).subscribe((response) => {
        if (response.status) {
          this.token = response.res;
          this.userId = response.userId;
          this.localstorage.setLocalStorage('token', this.token);
          this.localstorage.setLocalStorage('userId', this.userId);
          this.router.navigate(['videos-list']);
          console.log(this.token);
        } else {
          this.errorMessage = response.res;
          console.log(this.errorMessage);
        }
      });
    }
  }
}
