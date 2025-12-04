import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // für ngIf und ngFor

interface Skill {
  name: string;
  important: boolean;
}

interface UserProfile {
  name: string;
  jobTitle: string;
  experience: number;
  skills: Skill[];
}

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class Profil {

  private endpointGetProfile = 'https://backend.example.com/profile';
  private endpointSaveProfile = 'https://backend.example.com/profile/save';
  private endpointSaveSkill = 'https://backend.example.com/skill/save';
  private endpointDeleteSkill = 'https://backend.example.com/skill/delete';

  profile: UserProfile = {
    name: '',
    jobTitle: '',
    experience: 0,
    skills: []
  };

  editing = false;

  constructor(private router: Router, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.warn("Keine UID im LocalStorage gefunden.");
      this.setFallback();
      return;
    }

    fetch(`${this.endpointGetProfile}?uid=${uid}`)
      .then(res => {
        if (!res.ok) throw new Error("Backend Fehler");
        return res.json();
      })
      .then((data: UserProfile) => {
        this.profile = data;
        if (!this.profile.skills) this.profile.skills = [];
      })
      .catch(() => {
        console.warn("Backend nicht erreichbar, Test-Fallback wird genutzt.");
        this.setFallback();
      });
  }

  private setFallback() {
    this.profile = {
      name: 'Mustermann',
      jobTitle: 'Musterjob',
      experience: 3,
      skills: [
        { name: 'Angular', important: false },
        { name: 'TypeScript', important: true },
        { name: 'DevSecOps', important: false }
      ]
    };
    // Force Angular to update the view
    this.cd.detectChanges();
  }

  editProfile() { this.editing = true; }

  saveProfile() {
    this.editing = false;
    const uid = localStorage.getItem('uid');
    fetch(this.endpointSaveProfile, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, ...this.profile })
    }).catch(() => console.warn("Save Profile Backend Platzhalter"));
  }

  addSkill() {
    const skillInput = (document.getElementById('newSkill') as HTMLInputElement).value;
    if (!skillInput) return;

    const newSkill: Skill = { name: skillInput, important: false };
    this.profile.skills.push(newSkill);
    (document.getElementById('newSkill') as HTMLInputElement).value = '';
    this.saveSkill(newSkill);
  }

  saveSkill(skill: Skill) {
    const uid = localStorage.getItem('uid');
    fetch(this.endpointSaveSkill, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, skill })
    }).catch(() => console.warn("Save Skill Backend Platzhalter"));
  }

  deleteSkill(index: number) {
    const skill = this.profile.skills[index];
    this.profile.skills.splice(index, 1);
    const uid = localStorage.getItem('uid');
    fetch(this.endpointDeleteSkill, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, skillName: skill.name })
    }).catch(() => console.warn("Delete Skill Backend Platzhalter"));
  }

  toggleImportant(index: number) {
    const skill = this.profile.skills[index];
    skill.important = !skill.important;
    this.saveSkill(skill);
  }
}
