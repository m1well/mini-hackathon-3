import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JobAnalysis } from '@/shared/model';
import { JobAnalysisService } from '@/core/services/new-job-offer.service';
import { UserSessionService } from '@/core/services/user-session.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-job-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    NgClass
  ],
  templateUrl: './new-job-offer.html',
})
export class NewJobOfferComponent {

  private fb = inject(FormBuilder);
  private jobService = inject(JobAnalysisService);
  private session = inject(UserSessionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // State
  analysisResult$ = new BehaviorSubject<JobAnalysis | null>(null);
  isLoading = false; // Steuert dein Overlay

  jobUrlControl = new FormControl('', [Validators.required, Validators.pattern('https?://.+')]);
  jobTextControl = new FormControl('', [Validators.required, Validators.minLength(50)]);


  // --- ACTIONS ---
  async analyzeUrl() {
    if (this.jobUrlControl.invalid) return;

    const url = this.jobUrlControl.value?.trim();
    if (!url) return;

    this.startLoading();

    try {
      const code = this.getUserCodeOrRedirect();
      if (!code) return;

      const result = await this.jobService.analyzeUrl(code, url);
      this.analysisResult$.next(result);

    } catch (err) {
      console.error('Fehler bei URL Analyse:', err);
      alert('Die KI konnte die URL nicht analysieren. Versuche den Text manuell zu kopieren.');
    } finally {
      this.stopLoading();
    }
  }

  async analyzeText() {
    if (this.jobTextControl.invalid) return;

    const text = this.jobTextControl.value?.trim();
    if (!text) return;

    this.startLoading();

    try {
      const code = this.getUserCodeOrRedirect();
      if (!code) return;

      const result = await this.jobService.analyzeText(code, text);
      this.analysisResult$.next(result);

    } catch (err) {
      console.error('Fehler bei Text Analyse:', err);
      alert('Fehler bei der Analyse. Bitte versuche es erneut.');
    } finally {
      this.stopLoading();
    }
  }

  async saveAnalysis() {
    const analysis = this.analysisResult$.value;
    if (!analysis) return;

    this.startLoading(); // Auch beim Speichern kurz Spinner zeigen

    try {
      const code = this.getUserCodeOrRedirect();
      if (!code) return;

      await this.jobService.saveAnalysis(code, analysis);

      // Erfolg! Zurück zum Dashboard
      this.router.navigate(['/']);

    } catch (err) {
      console.error('Fehler beim Speichern:', err);
      alert('Speichern fehlgeschlagen.');
    } finally {
      this.stopLoading();
    }
  }

  discardAnalysis() {
    // Reset State
    this.analysisResult$.next(null);
    this.jobUrlControl.reset();
    this.jobTextControl.reset();
  }

  goToDashboard() {
    this.router.navigate(['/']);
  }

  // --- HELPER ---

  private startLoading() {
    this.isLoading = true;
    this.cdr.detectChanges(); // UI Update erzwingen
  }

  private stopLoading() {
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  private getUserCodeOrRedirect(): string | null {
    const code = this.session.getUserCode();
    if (!code) {
      alert('Session abgelaufen. Bitte neu anmelden.');
      this.router.navigate(['/register']);
      return null;
    }
    return code;
  }
}
