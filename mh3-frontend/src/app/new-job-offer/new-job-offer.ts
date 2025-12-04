import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { JobAnalysisService, JobAnalysis } from './new-job-offer.service';

@Component({
  selector: 'app-new-job-offer',
  standalone: true,
  imports: [
    CommonModule,         // für ngIf, async-Pipe
    ReactiveFormsModule   // für FormControls
  ],
  templateUrl: './new-job-offer.html',
  styleUrls: ['./new-job-offer.css']
})
export class NewJobOfferComponent {

  form: FormGroup;
  analysisResult$ = new BehaviorSubject<JobAnalysis | null>(null);

  constructor(
    private fb: FormBuilder,
    private jobService: JobAnalysisService,
    private router: Router
  ) {
    this.form = this.fb.group({
      jobUrl: this.fb.control<string>('', Validators.required),
      jobText: this.fb.control<string>('')
    });
  }

  // Getter für FormControls (Variante 3)
  get jobUrlControl(): FormControl {
    return this.form.get('jobUrl') as FormControl;
  }

  get jobTextControl(): FormControl {
    return this.form.get('jobText') as FormControl;
  }

  analyzeUrl() {
    const url = this.jobUrlControl.value?.trim();
    if (!url) return;

    const uid = localStorage.getItem('uid') || '';
    this.jobService.analyzeUrl(uid, url).subscribe({
      next: result => this.analysisResult$.next(result),
      error: err => {
        console.error('Fehler bei URL-Analyse:', err);
        this.analysisResult$.next(this.jobService.DUMMY_ANALYSIS);
      }
    });
  }

  analyzeText() {
    const text = this.jobTextControl.value?.trim();
    if (!text) return;

    const uid = localStorage.getItem('uid') || '';
    this.jobService.analyzeText(uid, text).subscribe({
      next: result => this.analysisResult$.next(result),
      error: err => {
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

    const uid = localStorage.getItem('uid') || '';
    this.jobService.saveAnalysis(uid, analysis).subscribe({
      next: () => this.router.navigate(['./dashboard']),
      error: err => console.error('Fehler beim Speichern:', err)
    });
  }
}
