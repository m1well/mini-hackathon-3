import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JobAnalysis } from '@/shared/model';
import { JobAnalysisService } from '@/core/services/new-job-offer.service';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-new-job-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './new-job-offer.html',
})
export class NewJobOfferComponent {
  private session = inject(UserSessionService);

  form: FormGroup;
  analysisResult$ = new BehaviorSubject<JobAnalysis | null>(null);

  constructor(
    private fb: FormBuilder,
    private jobService: JobAnalysisService,
    private router: Router
  ) {
    this.form = this.fb.group({
      jobUrl: this.fb.control<string>('', Validators.required),
      jobText: this.fb.control<string>('', Validators.required)
    });
  }

  // Getter für FormControls (Variante 3)
  get jobUrlControl(): FormControl {
    return this.form.get('jobUrl') as FormControl;
  }

  get jobTextControl(): FormControl {
    return this.form.get('jobText') as FormControl;
  }

  analyzeUrl(): void {
    const url: string = this.form.value.jobUrl?.trim();
    if (!url) return;

    const code = this.session.getUserCode() || '';

    this.jobService.analyzeUrl(code, url).subscribe({
      next: (result) => {
        this.analysisResult$.next(result);
      },
      error: (err) => {
        console.error('Fehler bei URL-Analyse:', err);
        this.analysisResult$.next(this.jobService.DUMMY_ANALYSIS);
      }
    });
  }

  analyzeText(): void {
    const text: string = this.form.value.jobText?.trim();
    if (!text) return;

    const code = this.session.getUserCode() || '';

    this.jobService.analyzeText(code, text).subscribe({
      next: (result) => this.analysisResult$.next(result),
      error: (err) => {
        console.error('Fehler bei Text-Analyse:', err);
        this.analysisResult$.next(this.jobService.DUMMY_ANALYSIS);
      }
    });
  }

  discardAnalysis() {
    this.analysisResult$.next(null);
  }

  saveAnalysis() {
    const analysis = this.analysisResult$.value;
    if (!analysis) return;

    const code = this.session.getUserCode() || '';
    this.jobService.saveAnalysis(code, analysis).subscribe({
      next: () => this.router.navigate([ '/' ]),
      error: err => console.error('Fehler beim Speichern:', err)
    });
  }
}
