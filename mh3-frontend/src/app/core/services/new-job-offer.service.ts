import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobAnalysis } from '@/shared/model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobAnalysisService {



  readonly DUMMY_ANALYSIS: JobAnalysis = {
    uniqueKey: 'unique-key',
    title: 'Java Full Stack Entwickler (m/w/d) bei it factum',
    company: 'Dummy Company',
    analyzedViaUrl: true,
    location: 'München',
    summary: 'Dummy Summary ...',
    techstack: ['Java','Spring Boot','Kotlin','Angular','React','Microservices'],
    tasks: 'Dummy tasks',
    workingModel: 'Teil-/Vollzeit, Home-Office möglich',
    experience: 'Mehrjährige Erfahrung',
    benefits: 'Unbefristeter Vertrag, Weiterbildung',
    culture: 'Teamorientierte Kultur',
    salaryRange: '45.000 € - 70.000 €',
    matchScore: 90,
    matchReasoning: 'Sehr guter technischer Fit'
  };

  async analyzeUrl(uid: string, url: string): Promise<JobAnalysis> {
  try {
    const res = await fetch(`${environment.apiUrl}/job/${uid}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: url,
        manualText: null
       })
    });

    if (!res.ok) throw new Error('Backend Fehler bei URL-Analyse');

    return await res.json();
  } catch {
    console.warn('Backend nicht erreichbar, Dummy-Analyse wird genutzt.');
    return this.DUMMY_ANALYSIS;
  }
}

async analyzeText(uid: string, text: string): Promise<JobAnalysis> {
  try {
    const res = await fetch(`${environment.apiUrl}/job/${uid}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        url: null,
        manualText: text 
      })
    });

    if (!res.ok) throw new Error('Backend Fehler bei Text-Analyse');

    return await res.json();
  } catch {
    console.warn('Backend nicht erreichbar, Dummy-Analyse wird genutzt.');
    return this.DUMMY_ANALYSIS;
  }
}


async saveAnalysis(uid: string, analysis: JobAnalysis): Promise<any> {
  try {
    const res = await fetch(`${environment.apiUrl}/job/${uid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analysis)
    });

    if (!res.ok) throw new Error('Backend Fehler beim Speichern');

    return await res.json();
  } catch {
    console.warn('Backend nicht erreichbar, Dummy-Save verwendet.');
    return null;
  }
}}
