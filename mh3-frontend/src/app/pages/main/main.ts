import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobOffer } from '@/shared/model';
import { JobOfferService } from '@/core/services/joboffer.service';
import { UserSessionService } from '@/core/services/user-session.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgClass
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  offers: JobOffer[] = [];
  selectedOffer: JobOffer | null = null;

  isSaving = false;
  isSavedSuccess = false;

  constructor(
    private jobOfferService: JobOfferService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const code = this.userSession.getUserCode();
    if (code) {
      this.offers = await this.jobOfferService.getOffers(code);
      this.cd.detectChanges();
    }
  }

  toggleDetails(offer: JobOffer) {
    // Wenn wir Details wechseln, laden wir nicht neu, da wir Änderungen ja lokal halten wollen,
    // bis gespeichert wird.
    this.selectedOffer = this.selectedOffer === offer ? null : offer;
  }

  /**
   * 🔥 Zentrale Speicher-Methode
   * Speichert ALLES (Status + Kommentar) für das ausgewählte Angebot.
   */
  async saveChanges(offer: JobOffer) {
    const code = this.userSession.getUserCode();
    if (!code) return;

    this.isSaving = true;
    this.isSavedSuccess = false; // Reset vor neuem Versuch

    try {
      await this.jobOfferService.updateOffer(code, offer);

      // Erfolgs-Status aktivieren
      this.isSavedSuccess = true;

      // Nach 2 Sekunden wieder zurücksetzen
      setTimeout(() => {
        this.isSavedSuccess = false;
        this.cd.detectChanges(); // UI Update erzwingen
      }, 2000);

    } catch (e) {
      console.error('Fehler beim Speichern', e);
      alert('Fehler beim Speichern!'); // Bei Fehler darf es nerven (Alert)
    } finally {
      this.isSaving = false;
      this.cd.detectChanges();
    }
  }
}
