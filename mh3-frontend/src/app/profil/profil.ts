import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil {
  constructor(private router: Router) {}

  addSkill(){
    alert("test")
  }
}
