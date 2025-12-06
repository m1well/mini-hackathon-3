import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { User } from '@/shared/model';
import { ProfileService } from '@/core/services/profile.service';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ FormsModule, RouterModule ],
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
  ) {
  }

  async ngOnInit() {
    const code = this.userSession.getUserCode();

    const realCode = code || 'fallback';
    const loaded = await this.profileService.getProfile(realCode);

    // wichtig: neues Objekt erzeugen → damit Angular Change-Detection sicher anspringt
    this.profile = { ...loaded };

    this.cd.detectChanges();
  }

  editProfile() {
    this.editing = true;
  }

  /** 🔥 Komplettes Profile speichern */
  async saveProfile() {
    const code = this.userSession.getUserCode();
    if (!code) return;

    await this.profileService.updateFullProfile(code, this.profile);
    this.editing = false;
  }

  /** 🔥 Skill hinzufügen → danach gesamtes Profile speichern */
  async addSkill() {
    const skillName = this.newSkillName.trim();
    if (!skillName) return;

    this.profile.techstack.push(skillName);
    this.newSkillName = '';

    const code = this.userSession.getUserCode();
    if (!code) return;

    await this.profileService.updateFullProfile(code, this.profile);
  }

  /** 🔥 Skill löschen → danach gesamtes Profile speichern */
  async deleteSkill(index: number) {
    this.profile.techstack.splice(index, 1);

    const code = this.userSession.getUserCode();
    if (!code) return;

    await this.profileService.updateFullProfile(code, this.profile);
  }

  goToDashboard() {
  this.router.navigate(['/']);
}

}
