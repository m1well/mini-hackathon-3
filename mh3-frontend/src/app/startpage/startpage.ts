import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './startpage.html',
})
export class Startpage {
  userId = '';

  constructor(
    private router: Router,
    private userSession: UserSessionService
  ) {
    if (this.userSession.hasUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  start(): void {
    if (!this.userId.trim()) return;

    this.userSession.setUserId(this.userId.trim());
    this.router.navigate(['/dashboard']);
  }

  goToRegistration(): void {
    this.router.navigate(['/registration']);
  }
}
