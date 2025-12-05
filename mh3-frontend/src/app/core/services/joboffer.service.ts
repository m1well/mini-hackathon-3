import { Injectable } from '@angular/core';
import { JobOffer } from '@/shared/model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobOfferService {

  async getOffers(userCode: string): Promise<JobOffer[]> {
    const res = await fetch(`${ environment.apiUrl }/job/${ userCode }`);
    if (!res.ok) throw new Error('Backend Fehler beim Laden der Angebote');
    const data: JobOffer[] = await res.json();
    return data.map(o => ({
      ...o,
      comment: o.comment ?? '',
      status: o.status ?? 'NEU'
    }));
  }

  async updateOffer(userCode: string, job: JobOffer) {
    const payload = {
      uniqueKey: job.uniqueKey,
      urlJob: job.urlJob,
      urlCompany: job.urlCompany,
      urlCompanyLogo: job.urlCompanyLogo,
      urlKununu: job.urlKununu,
      urlLinkedin: job.urlLinkedin
    };

    const res = await fetch(`${ environment.apiUrl }/job/${ userCode }`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Backend Fehler beim Update des Jobs');
  }

  async deleteOffer(userCode: string, jobKey: string) {
    // Backend unterstützt aktuell kein DELETE → wir könnten Status auf "Deleted" setzen oder PUT nutzen
    await this.updateOffer(userCode, {
      uniqueKey: jobKey,
      urlJob: undefined,
      urlCompany: undefined,
      urlCompanyLogo: undefined,
      urlKununu: undefined,
      urlLinkedin: undefined,
      title: '',
      company: '',
      analyzedViaUrl: false,
      location: '',
      summary: '',
      techstack: [],
      tasks: '',
      workingModel: '',
      experience: '',
      benefits: '',
      culture: '',
      salaryRange: '',
      matchScore: 0,
      matchReasoning: '',
      status: 'DELETED',
      comment: ''
    });
  }
}
