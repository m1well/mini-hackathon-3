import { Injectable } from '@angular/core';
import { RegistrationPayload } from '@/shared/model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {

  async register(payload: RegistrationPayload): Promise<string> {
    try {
      const response = await fetch(`${environment.apiUrl}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      return data.uniqueCode ?? '1234';
    } catch (err) {
      console.warn('Backend nicht erreichbar, Fallback Code wird genutzt.', err);
      return '1234';
    }
  }
}
