import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  private router = inject(Router);
  private session = inject(UserSessionService);

  code = '';

  ngOnInit() {
    if (this.session.hasUser()) {
      this.router.navigate([ '/' ]);
    }
  }

  start(): void {
    if (!this.code.trim()) return;

    this.session.setUserCode(this.code.trim());
    this.router.navigate([ '/' ]);
  }

  goToRegistration(): void {
    this.router.navigate([ '/registration' ]);
  }
}
