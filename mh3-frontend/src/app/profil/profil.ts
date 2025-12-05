import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProfileService, UserProfile, Skill } from '../services/profile.service';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profil.html',
})
export class Profil {
  profile: UserProfile = { name: '', jobTitle: '', experience: 0, skills: [] };
  editing = false;
  newSkillName = '';

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    const uid = this.userSession.getUserId();
    if (!uid) {
      console.warn('Keine UID gefunden, fallback verwenden');
      this.profile = await this.profileService.getProfile('fallback');
      this.cd.detectChanges();
      return;
    }
    this.profile = await this.profileService.getProfile(uid);
    this.cd.detectChanges();
  }

  editProfile() { this.editing = true; }

  async saveProfile() {
    const uid = this.userSession.getUserId();
    if (!uid) return;
    await this.profileService.saveProfile(uid, this.profile);
    this.editing = false;
  }

  async addSkill() {
    const skillName = this.newSkillName.trim();
    if (!skillName) return;
    const newSkill: Skill = { name: skillName, important: false };
    this.profile.skills.push(newSkill);
    this.newSkillName = '';
    const uid = this.userSession.getUserId();
    if (!uid) return;
    await this.profileService.saveSkill(uid, newSkill);
  }

  async deleteSkill(index: number) {
    const skill = this.profile.skills[index];
    this.profile.skills.splice(index, 1);
    const uid = this.userSession.getUserId();
    if (!uid) return;
    await this.profileService.deleteSkill(uid, skill.name);
  }

  async toggleImportant(index: number) {
    const skill = this.profile.skills[index];
    skill.important = !skill.important;
    const uid = this.userSession.getUserId();
    if (!uid) return;
    await this.profileService.saveSkill(uid, skill);
  }
}
