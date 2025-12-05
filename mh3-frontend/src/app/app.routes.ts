import { Routes } from '@angular/router';
import { Main } from '@/pages/main/main';
import { Login } from '@/pages/login/login';
import { Imprint } from './imprint/imprint';
import { Datenschutz } from './datenschutz/datenschutz';
import { Profil } from './profil/profil';
import { authGuard } from './guards/auth-guard'; // dein AuthGuard
import { NewJobOfferComponent } from './new-job-offer/new-job-offer';
import { Registration } from './registation/registration';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Main, canActivate: [ authGuard ] },
  { path: 'login', component: Login },
  { path: 'registration', component: Registration },
  { path: 'newjo', component: NewJobOfferComponent, canActivate: [ authGuard ] },
  { path: 'imprint', component: Imprint },
  { path: 'datenschutz', component: Datenschutz },
  { path: 'profil', component: Profil, canActivate: [ authGuard ] },
  { path: '**', redirectTo: '' }
];
