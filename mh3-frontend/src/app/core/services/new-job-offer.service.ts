import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobAnalysis } from '@/shared/model';

@Injectable({
  providedIn: 'root'
})
export class JobAnalysisService {
  private http = inject(HttpClient);

  private endpointUrlAnalysis = 'https://backend.example.com/job/url';
  private endpointTextAnalysis = 'https://backend.example.com/job/text';
  private endpointSaveOffer = 'https://backend.example.com/job/save';

  readonly DUMMY_ANALYSIS: JobAnalysis = {
    uniqueKey: 'unique-key',
    title: 'Java Full Stack Entwickler (m/w/d) bei it factum',
    company: 'Dummy Company',
    analyzedViaUrl: true,
    location: 'München',
    summary: 'Dummy Summary ...',
    techStack: ['Java','Spring Boot','Kotlin','Angular','React','Microservices'],
    tasks: 'Dummy tasks',
    workingModel: 'Teil-/Vollzeit, Home-Office möglich',
    experience: 'Mehrjährige Erfahrung',
    benefits: 'Unbefristeter Vertrag, Weiterbildung',
    culture: 'Teamorientierte Kultur',
    salaryRange: '45.000 € - 70.000 €',
    matchScore: 90,
    matchReasoning: 'Sehr guter technischer Fit'
  };

  analyzeUrl(code: string, url: string): Observable<JobAnalysis> {
    return this.http.post<JobAnalysis>(this.endpointUrlAnalysis, { code, url })
      .pipe(
        catchError(() => {
          console.warn('Backend nicht erreichbar, Dummy-Analyse wird genutzt.');
          return of(this.DUMMY_ANALYSIS);
        })
      );
  }

  analyzeText(code: string, text: string): Observable<JobAnalysis> {
    return this.http.post<JobAnalysis>(this.endpointTextAnalysis, { code, text })
      .pipe(
        catchError(() => {
          console.warn('Backend nicht erreichbar, Dummy-Analyse wird genutzt.');
          return of(this.DUMMY_ANALYSIS);
        })
      );
  }

  saveAnalysis(code: string, analysis: JobAnalysis): Observable<any> {
    return this.http.post(this.endpointSaveOffer, { code, ...analysis })
      .pipe(
        catchError(() => {
          console.warn('Backend nicht erreichbar, Dummy-Save genutzt.');
          return of(null);
        })
      );
  }
}
