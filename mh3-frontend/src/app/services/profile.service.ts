import { Injectable } from '@angular/core';

export interface Skill {
  name: string;
  important: boolean;
}

export interface UserProfile {
  name: string;
  jobTitle: string;
  experience: number;
  skills: Skill[];
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private endpointGetProfile = 'https://backend.example.com/profile';
  private endpointSaveProfile = 'https://backend.example.com/profile/save';
  private endpointSaveSkill = 'https://backend.example.com/skill/save';
  private endpointDeleteSkill = 'https://backend.example.com/skill/delete';

  async getProfile(uid: string): Promise<UserProfile> {
    try {
      const res = await fetch(`${this.endpointGetProfile}?uid=${uid}`);
      if (!res.ok) throw new Error('Backend Fehler');
      const data = await res.json();
      return data.skills ? data : { ...data, skills: [] };
    } catch {
      console.warn('Backend nicht erreichbar, Fallback nutzen.');
      return {
        name: 'Mustermann',
        jobTitle: 'Musterjob',
        experience: 3,
        skills: [
          { name: 'Angular', important: false },
          { name: 'TypeScript', important: true },
          { name: 'DevSecOps', important: false }
        ]
      };
    }
  }

  async saveProfile(uid: string, profile: UserProfile) {
    try {
      await fetch(this.endpointSaveProfile, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, ...profile })
      });
    } catch {
      console.warn('Save Profile Backend Platzhalter');
    }
  }

  async saveSkill(uid: string, skill: Skill) {
    try {
      await fetch(this.endpointSaveSkill, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, skill })
      });
    } catch {
      console.warn('Save Skill Backend Platzhalter');
    }
  }

  async deleteSkill(uid: string, skillName: string) {
    try {
      await fetch(this.endpointDeleteSkill, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, skillName })
      });
    } catch {
      console.warn('Delete Skill Backend Platzhalter');
    }
  }
}
