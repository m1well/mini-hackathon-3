import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [],
  templateUrl: './startpage.html',
  styleUrls: ['./startpage.css']
})
export class Startpage {
  constructor(private router: Router) {}

  start() {
    const input = document.getElementById('userID') as HTMLInputElement;

    if (input && input.value.trim() !== '') {
      const uid = input.value.trim();
      localStorage.setItem('uid', uid);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Bitte gib eine UserID ein!');
    }
  }
}
