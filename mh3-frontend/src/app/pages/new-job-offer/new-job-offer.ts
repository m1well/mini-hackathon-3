import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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

  private jobService = inject(JobAnalysisService);
  private session = inject(UserSessionService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  analysisResult$ = new BehaviorSubject<JobAnalysis | null>(null);
  isLoading = false;

  jobUrlControl = new FormControl('', [ Validators.required, Validators.pattern('https?://.+') ]);
  jobTextControl = new FormControl('', [ Validators.required, Validators.minLength(50) ]);

  toastMessage: string | null = null;
  toastType: 'error' | 'success' = 'error';

  private showToast(message: string, type: 'error' | 'success' = 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.cdr.detectChanges();

    // remove after 3 seconds
    setTimeout(() => {
      this.toastMessage = null;
      this.cdr.detectChanges();
    }, 3500);
  }

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
      this.showToast('Die KI konnte die URL nicht lesen. Kopiere bitte den Text manuell.', 'error');
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
      this.showToast('Fehler bei der Analyse. Versuche es erneut.', 'error');
    } finally {
      this.stopLoading();
    }
  }

  async saveAnalysis() {
    const analysis = this.analysisResult$.value;
    if (!analysis) return;

    this.startLoading();

    try {
      const code = this.getUserCodeOrRedirect();
      if (!code) return;

      await this.jobService.saveAnalysis(code, analysis);

      this.showToast('Job erfolgreich gespeichert!', 'success');
      setTimeout(() => this.router.navigate([ '/' ]), 2000);

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
    this.router.navigate([ '/' ]);
  }

  // --- HELPER ---

  private startLoading() {
    this.isLoading = true;
    this.cdr.detectChanges();
  }

  private stopLoading() {
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  private getUserCodeOrRedirect(): string | null {
    const code = this.session.getUserCode();
    if (!code) {
      alert('Session abgelaufen. Bitte neu anmelden.');
      this.router.navigate([ '/login' ]);
      return null;
    }
    return code;
  }
}
