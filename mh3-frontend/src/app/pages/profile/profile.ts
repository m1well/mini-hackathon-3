import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '@/shared/model';
import { ProfileService } from '@/core/services/profile.service';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
})
export class Profile {
  profile: User = { firstName: '', currentJobTitle: '', experienceYears: 0, preferences: '', techstack: [] };
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

  const realUid = uid || 'fallback';
  const loaded = await this.profileService.getProfile(realUid);

  // wichtig: neues Objekt erzeugen → damit Angular Change-Detection sicher anspringt
  this.profile = { ...loaded };

  this.cd.detectChanges();
}

  editProfile() {
    this.editing = true;
  }

  /** 🔥 Komplettes Profile speichern */
  async saveProfile() {
    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.profileService.updateFullProfile(uid, this.profile);
    this.editing = false;
  }

  /** 🔥 Skill hinzufügen → danach gesamtes Profile speichern */
  async addSkill() {
    const skillName = this.newSkillName.trim();
    if (!skillName) return;

    this.profile.techstack.push(skillName);
    this.newSkillName = '';

    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.profileService.updateFullProfile(uid, this.profile);
  }

  /** 🔥 Skill löschen → danach gesamtes Profile speichern */
  async deleteSkill(index: number) {
    this.profile.techstack.splice(index, 1);

    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.profileService.updateFullProfile(uid, this.profile);
  }
}
