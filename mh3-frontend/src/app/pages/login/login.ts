import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {
  userId = '';

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {
    if (this.userSession.hasUser()) {
      this.router.navigate(['/']);
    }
  }

  start(): void {
    if (!this.userId.trim()) return;

    this.userSession.setUserId(this.userId.trim());
    this.router.navigate(['/']);
  }

  goToRegistration(): void {
    this.router.navigate(['/registration']);
  }
}
