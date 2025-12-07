import { Injectable } from '@angular/core';
import { JobAnalysis } from '@/shared/model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobAnalysisService {

  async analyzeUrl(uid: string, url: string): Promise<JobAnalysis> {
    const res = await fetch(`${ environment.apiUrl }/job/${ uid }/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url,
        manualText: null
      })
    });

    if (!res.ok) throw new Error('Backend Fehler bei URL-Analyse');

    return await res.json();
  }

  async analyzeText(uid: string, text: string): Promise<JobAnalysis> {
    const res = await fetch(`${ environment.apiUrl }/job/${ uid }/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: null,
        manualText: text
      })
    });

    if (!res.ok) throw new Error('Backend Fehler bei Text-Analyse');

    return await res.json();
  }


  async saveAnalysis(uid: string, analysis: JobAnalysis): Promise<any> {
    try {
      const res = await fetch(`${ environment.apiUrl }/job/${ uid }`, {
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
  }
}
