import { Injectable } from '@angular/core';
import { User } from '@/shared/model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  async getProfile(code: string): Promise<User> {
    try {
      const res = await fetch(`${environment.apiUrl}/user/${code}`);
      if (!res.ok) throw new Error('Backend Fehler');
      const data = await res.json();
      return data.techstack ? data : { ...data, techstack: [] };
    } catch {
      console.warn('Backend nicht erreichbar, Fallback nutzen.');
      return {
        firstName: 'Mustermann',
        currentJobTitle: 'Musterjob',
        experienceYears: 3,
        preferences: 'Ich mag Ci/CD',
        techstack: ['Angular', 'TypeScript', 'DevSecOps']
      };
    }
  }

  async updateFullProfile(code: string, profile: User) {
    const payload = {
      currentJobTitle: profile.currentJobTitle,
      experienceYears: profile.experienceYears,
      preferences: profile.preferences.toString(),
      techstack: profile.techstack
    };

    try {
      const res = await fetch(`${environment.apiUrl}/user/${code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) console.warn('Backend PUT Fehler');
    } catch {
      console.warn('PUT Fallback: Backend nicht erreichbar');
    }
  }
}
