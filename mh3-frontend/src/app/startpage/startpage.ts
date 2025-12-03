import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startpage',
  standalone: true,
  imports: [],
  templateUrl: './startpage.html',
  styleUrl: './startpage.css'
})
export class Startpage {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const uid = localStorage.getItem('uid');

    if (uid) {
      // Wenn UID existiert → direkt weiterleiten
      this.router.navigate(['/dashboard']);
    }
  }

  start(): void {
    const input = document.getElementById('userID') as HTMLInputElement;

    if (!input || !input.value.trim()) {
      return;
    }

    localStorage.setItem('uid', input.value.trim());
    this.router.navigate(['/dashboard']);
  }
}
