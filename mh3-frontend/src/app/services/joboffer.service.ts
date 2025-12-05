import { Injectable } from '@angular/core';

export interface JobOffer {
  id: string;
  name: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  summary: string;
  techStack: string[];
  benefits: {
    tasks: string;
    workingModel: string;
    experience: string;
    benefits: string;
    culture: string;
  };
  matchReasoning: string;
  status: string;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class JobOfferService {
  private endpointGetOffers = 'https://backend.example.com/offers';
  private endpointDeleteOffer = 'https://backend.example.com/offers/delete';
  private endpointUpdateOffer = 'https://backend.example.com/offers/update';

  async getOffers(uid: string): Promise<JobOffer[]> {
    try {
      const res = await fetch(`${this.endpointGetOffers}?uid=${uid}`);
      if (!res.ok) throw new Error('Backend Fehler');
      const data: JobOffer[] = await res.json();
      return data.map(o => ({ ...o, comment: o.comment ?? '', status: o.status ?? 'NEU' }));
    } catch {
      console.warn('Backend nicht erreichbar, Fallback nutzen.');
      return [
        {
          id: '1',
          name: 'it factum',
          location: 'München/Remote',
          salaryRange: '45.000 - 70.000 €',
          matchScore: 90,
          summary: 'it factum sucht einen Java Full Stack Entwickler (m/w/d)...',
          techStack: ['Java', 'Spring Boot', 'Kotlin', 'Jakarta EE', 'Angular', 'React'],
          benefits: {
            tasks: 'Neu- und Weiterentwicklung von Anwendungen im Java-Ökosystem...',
            workingModel: 'Teil-/Vollzeit, Home-Office möglich',
            experience: 'Mehrjährige Erfahrung in objektorientierter Java-Entwicklung',
            benefits: 'Unbefristeter Vertrag, Weiterbildungsmöglichkeiten, Firmenwagen',
            culture: 'Teamorientierte, offene Kultur mit Humor'
          },
          matchReasoning: 'Sehr guter technischer Fit: Du bringst 7 Jahre Erfahrung...',
          status: 'NEU',
          comment: ''
        }
      ];
    }
  }

  async deleteOffer(uid: string, offerId: string) {
    try {
      await fetch(this.endpointDeleteOffer, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, offerId })
      });
    } catch {
      console.warn('Delete Offer Backend Platzhalter');
    }
  }

  async updateOffer(uid: string, offerId: string, update: Partial<JobOffer>) {
    try {
      await fetch(this.endpointUpdateOffer, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, offerId, ...update })
      });
    } catch {
      console.warn('Update Offer Backend Platzhalter');
    }
  }
}
