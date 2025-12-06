import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private readonly key = 'code';

  getUserCode(): string | null {
    return localStorage.getItem(this.key);
  }

  setUserCode(code: string): void {
    localStorage.setItem(this.key, code);
  }

  hasUser(): boolean {
    return !!this.getUserCode();
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
