import { Component } from '@angular/core';
import { AthenticationService } from '../../services/auth/athentication.service';
import { User } from '../../schemas/authentication';
import { LocalstorageService } from '../../services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private authService: AthenticationService,
    private router: Router,
    private localstorage: LocalstorageService
  ) {}

  errorMessage: string = '';
  token: string = '';
  userId: string = '';
  username: string = '';
  password: string = '';

  signup(user: User): void {
    if (!user.password || !user.username) {
      this.errorMessage = 'Please insert username and password !!!';
    } else {
      console.log(user);
      this.authService.signupService(user).subscribe((response) => {
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
