import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '@/core/services/profile.service';
import { UserSessionService } from '@/core/services/user-session.service';
import { User } from '@/shared/model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private session = inject(UserSessionService);

  // 1. State als Signals
  profile = signal<User>({
    firstName: '',
    currentJobTitle: '',
    experienceYears: 0,
    preferences: '',
    techstack: []
  });

  editing = signal(false);
  newSkillName = signal('');

  // Backup for reset
  private backupProfile: User | null = null;

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const code = this.session.getUserCode();
    if (!code) return;

    const data = await this.profileService.getProfile(code)
    if (data) {
      this.profile.set(data);
    }
  }

  // --- EDIT MODUS ---

  editProfile() {
    this.backupProfile = structuredClone(this.profile());
    this.editing.set(true);
  }

  cancelProfile() {
    // reset profile from backup
    if (this.backupProfile) {
      this.profile.set(structuredClone(this.backupProfile));
    }
    this.editing.set(false);
  }

  async saveProfile() {
    const code = this.session.getUserCode();
    if (!code) return;

    try {
      await this.profileService.updateFullProfile(code, this.profile());

      this.editing.set(false);
      this.backupProfile = null;
    } catch (e) {
      console.error("Fehler beim Speichern", e);
    }
  }

  // --- SKILLS ---

  async addSkill() {
    const skillName = this.newSkillName().trim();

    if (!skillName) return;

    // check if skill is already in list
    const alreadyExists = this.profile().techstack.some(
      existingSkill => existingSkill.toLowerCase() === skillName.toLowerCase()
    );

    if (alreadyExists) {
      alert(`Der Skill "${ skillName }" ist bereits in deiner Liste!`);
      return;
    }

    this.profile().techstack.push(skillName);
    this.newSkillName.set(''); // Input leeren
    const code = this.session.getUserCode();
    if (code) {
      await this.profileService.updateFullProfile(code, this.profile());
    }
  }

  async deleteSkill(index: number) {
    this.profile.update(p => ({
      ...p,
      techstack: p.techstack.filter((_, i) => i !== index)
    }));

    await this.saveProfileSilent();
  }

  private async saveProfileSilent() {
    const code = this.session.getUserCode();
    if (!code) return;
    await this.profileService.updateFullProfile(code, this.profile());
  }

  goToDashboard() {
    this.router.navigate([ '/' ]);
  }
}
