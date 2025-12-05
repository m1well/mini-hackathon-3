import { Injectable } from '@angular/core';
import { RegistrationPayload } from '@/shared/model';

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  private readonly endpoint = 'http://127.0.0.1:8087/user';

  async register(payload: RegistrationPayload): Promise<string> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return data.uniqueCode ?? '1234';
    } catch (err) {
      console.warn('Backend nicht erreichbar, Fallback UID wird genutzt.', err);
      return '1234';
    }
  }
}
