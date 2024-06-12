import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userId = '';
  password = '';

  constructor(private authService: AuthService, private router : Router) { }

  login() {
    if (!this.userId || !this.password) {
      alert('All fields are required');
      return;
    }

    this.authService.login(this.userId, this.password)
      .subscribe(
        authToken => {
          localStorage.setItem('authToken', authToken);
          alert('Login successful');
          console.log("Authentication Token :", authToken);
          this.router.navigate(['/search']);
        },
        error => alert('Login failed')
      );
  }
}
