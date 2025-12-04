import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {

  // Platzhalter Backend Endpoint
  private endpoint = 'https://backend.example.com/api/register';

  constructor(private router: Router) {}

  validatePrivacy() {
    const privacyCheck = document.getElementById('privacyCheck') as HTMLInputElement;
    const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement;
    registerBtn.disabled = !privacyCheck.checked;
  }

  validateUidConfirm() {
    const confirm = document.getElementById('uidConfirmed') as HTMLInputElement;
    const startBtn = document.getElementById('startBtn') as HTMLButtonElement;
    startBtn.disabled = !confirm.checked;
  }

  async register() {
    const name = (document.getElementById('regName') as HTMLInputElement).value;
    const job = (document.getElementById('regJob') as HTMLInputElement).value;
    const exp = (document.getElementById('regExp') as HTMLInputElement).value;

    if (!name || !job || !exp) {
      alert('Bitte alle Felder ausfüllen.');
      return;
    }

    const payload = {
      name,
      jobTitle: job,
      experience: parseInt(exp, 10)
    };

    let uid: string | null = null;

    try {
      // echter POST (funktioniert später)
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        uid = data.uid ?? null;
      } else {
        console.warn("Backend antwortete mit Fehler:", response.status);
      }
    } catch (error) {
      console.warn("Backend nicht erreichbar. Fallback UID wird genutzt.", error);
    }

    // Falls Backend fehlgeschlagen → Test UID nutzen
    if (!uid) {
      uid = "1234";
    }

    // UID anzeigen
    const uidElement = document.getElementById('uidDisplay')!;
    const uidSection = document.getElementById('uidSection')!;

    uidElement.textContent = uid;
    uidSection.classList.remove('hidden');
  }

  goToStart() {
  const uidElement = document.getElementById('uidDisplay');

  if (!uidElement || !uidElement.textContent) {
    console.error("Keine UID gefunden – Start abgebrochen.");
    return;
  }

  const uid = uidElement.textContent.trim();

  // UID im LocalStorage speichern
  localStorage.setItem('uid', uid);

  // Weiterleitung zum Profil
  this.router.navigate(['/profil']);
}
}
