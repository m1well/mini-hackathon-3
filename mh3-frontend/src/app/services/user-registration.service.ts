import { Injectable } from '@angular/core';

export interface RegistrationPayload {
  name: string;
  jobTitle: string;
  experience: number;
}

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  private readonly endpoint = 'https://backend.example.com/api/register';

  async register(payload: RegistrationPayload): Promise<string> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return data.uid ?? '1234';
    } catch (err) {
      console.warn('Backend nicht erreichbar, Fallback UID wird genutzt.', err);
      return '1234';
    }
  }
}
