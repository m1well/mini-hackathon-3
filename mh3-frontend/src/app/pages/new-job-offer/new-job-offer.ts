import { ChangeDetectorRef, Component, inject } from '@angular/core';
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
    private router: Router,
    private cdr: ChangeDetectorRef
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

  this.jobService.analyzeUrl(code, url)
    .then((result: JobAnalysis) => {
      this.analysisResult$.next(result);
      this.cdr.detectChanges();   // <<< wichtig
    })
    .catch((err: unknown) => {
      console.error('Fehler bei analyzeUrl:', err);
    });
}

analyzeText(): void {
  const text: string = this.form.value.jobText?.trim();
  if (!text) return;

  const code = this.session.getUserCode() || '';

  this.jobService.analyzeText(code, text)
    .then((result: JobAnalysis) => {
      this.analysisResult$.next(result);
      this.cdr.detectChanges();  // <<< wichtig
    })
    .catch((err: unknown) => {
      console.error('Fehler bei analyzeText:', err);
    });
}


  discardAnalysis() {
    this.analysisResult$.next(null);
  }

saveAnalysis() {
  const analysis = this.analysisResult$.value;
  if (!analysis) return;

  const code = this.session.getUserCode() || '';
  
  this.jobService.saveAnalysis(code, analysis)
    .then(() => {
      console.log('Gespeichert');
      this.router.navigate(['/dashboard']); // <<< Weiterleitung nach Dashboard
    })
    .catch((err: unknown) => {
      console.error('Fehler beim Speichern:', err);
    });
}

goToDashboard() {
  this.router.navigate(['/']);
}


}
