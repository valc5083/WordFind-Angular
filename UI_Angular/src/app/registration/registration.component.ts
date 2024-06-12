import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  userId = '';
  username = '';
  password = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (!this.userId || !this.username || !this.password || !this.email) {
      alert('All fields are required');
      return;
    }

    this.authService.register(this.userId, this.username, this.password, this.email)
      .subscribe(
        response => {
          alert('Registration successful');
          this.router.navigate(['/login']);
        },
        error => {
          alert('Registration failed: ' + error.error);
          console.error('Registration failed', error);
        }
      );
  }
}
