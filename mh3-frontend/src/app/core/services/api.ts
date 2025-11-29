import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Util} from '@/shared/model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);

  getServiceUtil(): Observable<Util> {
    console.log(environment)
    return this.http.get<Util>(`${environment.apiUrl}/util`, {});
  }
}
