import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface JobAnalysis {
  title: string;
  summary: string;
  techStack: string[];
  benefits: {
    tasks: string;
    workingModel: string;
    experience: string;
    benefits: string;
    culture: string;
  };
  salaryRange: string;
  matchScore: number;
  matchReasoning: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobAnalysisService {

  private endpointUrlAnalysis = 'https://backend.example.com/job/url';
  private endpointTextAnalysis = 'https://backend.example.com/job/text';
  private endpointSaveOffer = 'https://backend.example.com/job/save';

  readonly DUMMY_ANALYSIS: JobAnalysis = {
    title: "Java Full Stack Entwickler (m/w/d) bei it factum",
    summary: "Dummy Summary ...",
    techStack: ["Java","Spring Boot","Kotlin","Angular","React","Microservices"],
    benefits: {
      tasks: "Dummy tasks",
      workingModel: "Teil-/Vollzeit, Home-Office möglich",
      experience: "Mehrjährige Erfahrung",
      benefits: "Unbefristeter Vertrag, Weiterbildung",
      culture: "Teamorientierte Kultur"
    },
    salaryRange: "45.000 € - 70.000 €",
    matchScore: 90,
    matchReasoning: "Sehr guter technischer Fit"
  };

  constructor(private http: HttpClient) {}

  analyzeUrl(uid: string, url: string): Observable<JobAnalysis> {
    return this.http.post<JobAnalysis>(this.endpointUrlAnalysis, { uid, url })
      .pipe(
        catchError(() => {
          console.warn("Backend nicht erreichbar, Dummy-Analyse wird genutzt.");
          return of(this.DUMMY_ANALYSIS);
        })
      );
  }

  analyzeText(uid: string, text: string): Observable<JobAnalysis> {
    return this.http.post<JobAnalysis>(this.endpointTextAnalysis, { uid, text })
      .pipe(
        catchError(() => {
          console.warn("Backend nicht erreichbar, Dummy-Analyse wird genutzt.");
          return of(this.DUMMY_ANALYSIS);
        })
      );
  }

  saveAnalysis(uid: string, analysis: JobAnalysis): Observable<any> {
    return this.http.post(this.endpointSaveOffer, { uid, ...analysis })
      .pipe(
        catchError(() => {
          console.warn("Backend nicht erreichbar, Dummy-Save genutzt.");
          return of(null);
        })
      );
  }
}
