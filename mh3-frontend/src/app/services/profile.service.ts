import { Injectable } from '@angular/core';

export interface UserProfile {
  firstName: string;
  currentJobTitle: string;
  preferences: number;
  techstack: string[];
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private endpointProfile = 'http://127.0.0.1:8087/user';

  async getProfile(uid: string): Promise<UserProfile> {
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
        preferences: 3,
        techstack: ['Angular', 'TypeScript', 'DevSecOps']
      };
    }
  }

  /** 🔥 NEU: Komplettes Profil via PUT speichern */
  async updateFullProfile(uid: string, profile: UserProfile) {
    const payload = {
      currentJobTitle: profile.currentJobTitle,
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
