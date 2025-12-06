import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RegistrationPayload } from '@/shared/model';
import { UserRegistrationService } from '@/core/services/user-registration.service';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ FormsModule ],
  templateUrl: './registration.html',
})
export class Registration {
  name = '';
  job = '';
  exp: number | null = null;
  preferences = '';

  privacyAccepted = false;
  codeConfirmed = false;
  code: string | null = null;

  constructor(
    private router: Router,
    private registrationService: UserRegistrationService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
  ) {
  }

  // Getter für Buttons
  get canRegister() {
    return this.privacyAccepted && !!this.name && !!this.job && this.exp !== null;
  }

  get canStart() {
    return this.codeConfirmed && !!this.code;
  }

  // Registrierung
  async register() {
    if (!this.canRegister) return;

    const payload: RegistrationPayload = {
      firstName: this.name,
      currentJobTitle: this.job,
      experienceYears: this.exp!,
      preferences: this.preferences,
    };

    try {
      const generatedCode = await this.registrationService.register(payload);
      this.code = generatedCode;
      this.cd.detectChanges();
    } catch (err) {
      console.error('Fehler bei Registrierung:', err);
      this.code = '1234';
      this.cd.detectChanges();
    }
  }

  // Weiterleitung nach Bestätigung
  goToStart() {
    if (!this.canStart) return;

    this.userSession.setUserCode(this.code!);
    this.router.navigate([ '/profile' ]);
  }
}
