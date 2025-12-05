import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRegistrationService, RegistrationPayload } from '../services/user-registration.service';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.html',
})
export class Registration {
  name = '';
  job = '';
  exp: number | null = null;

  privacyAccepted = false;
  uidConfirmed = false;
  uid: string | null = null;

  constructor(
    private router: Router,
    private registrationService: UserRegistrationService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  // Getter für Buttons
  get canRegister() {
    return this.privacyAccepted && !!this.name && !!this.job && this.exp !== null;
  }

  get canStart() {
    return this.uidConfirmed && !!this.uid;
  }

  // Registrierung
async register() {
  if (!this.canRegister) return;

  const payload: RegistrationPayload = {
    name: this.name,
    jobTitle: this.job,
    experience: this.exp!,
  };

  try {
    const generatedUid = await this.registrationService.register(payload);

    // UID setzen und sofortige Aktualisierung erzwingen
    this.uid = generatedUid;
    this.cd.detectChanges();
  } catch (err) {
    console.error('Fehler bei Registrierung:', err);
    this.uid = '1234';
    this.cd.detectChanges();
  }
}

  // Weiterleitung nach UID-Bestätigung
  goToStart() {
    if (!this.canStart) return;

    this.userSession.setUserId(this.uid!);
    this.router.navigate(['/profil']);
  }
}
