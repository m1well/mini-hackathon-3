import { Routes } from '@angular/router';
import { Main } from '@/pages/main/main';
import { Login } from '@/pages/login/login';
import { Imprint } from '@/pages/imprint/imprint';
import { Datenschutz } from '@/pages/datenschutz/datenschutz';
import { Profile } from '@/pages/profile/profile';
import { authGuard } from '@/core/guards/auth-guard'; // dein AuthGuard
import { NewJobOfferComponent } from '@/pages/new-job-offer/new-job-offer';
import { Registration } from '@/pages/registation/registration';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Main, canActivate: [ authGuard ] },
  { path: 'login', component: Login },
  { path: 'registration', component: Registration },
  { path: 'newjo', component: NewJobOfferComponent, canActivate: [ authGuard ] },
  { path: 'imprint', component: Imprint },
  { path: 'datenschutz', component: Datenschutz },
  { path: 'profile', component: Profile, canActivate: [ authGuard ] },
  { path: '**', redirectTo: '' }
];
