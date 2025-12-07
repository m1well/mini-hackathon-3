import { Routes } from '@angular/router';
import { Main } from '@/pages/main/main';
import { Login } from '@/pages/login/login';
import { Imprint } from '@/pages/imprint/imprint';
import { Privacy } from '@/pages/privacy/privacy';
import { Profile } from '@/pages/profile/profile';
import { authGuard } from '@/core/guards/auth-guard'; // dein AuthGuard
import { NewJobOfferComponent } from '@/pages/new-job-offer/new-job-offer';
import { Registration } from '@/pages/registation/registration';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Main, canActivate: [ authGuard ] },
  { path: 'login', component: Login },
  { path: 'registration', component: Registration },
  { path: 'job', component: NewJobOfferComponent, canActivate: [ authGuard ] },
  { path: 'imprint', component: Imprint },
  { path: 'privacy', component: Privacy },
  { path: 'profile', component: Profile, canActivate: [ authGuard ] },
  { path: '**', redirectTo: '' }
];
