import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private readonly key = 'uid';

  getUserId(): string | null {
    return localStorage.getItem(this.key);
  }

  setUserId(id: string): void {
    localStorage.setItem(this.key, id);
  }

  hasUser(): boolean {
    return !!this.getUserId();
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
