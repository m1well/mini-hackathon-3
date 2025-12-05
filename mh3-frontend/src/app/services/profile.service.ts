import { Injectable } from '@angular/core';
import { User } from '@/shared/model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private endpointProfile = 'http://127.0.0.1:8087/user';

  async getProfile(uid: string): Promise<User> {
    try {
      const res = await fetch(`${this.endpointProfile}/${uid}`);
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

  /** 🔥 NEU: Komplettes Profile via PUT speichern */
  async updateFullProfile(uid: string, profile: User) {
    const payload = {
      currentJobTitle: profile.currentJobTitle,
      experienceYears: profile.experienceYears,
      preferences: profile.preferences.toString(),
      techstack: profile.techstack
    };

    try {
      const res = await fetch(`${this.endpointProfile}/${uid}`, {
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
