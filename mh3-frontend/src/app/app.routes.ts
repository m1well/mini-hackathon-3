import { Routes } from '@angular/router';
import { Main } from '@/pages/main/main';
import { Startpage } from './startpage/startpage';
import { Imprint } from './imprint/imprint';
import { Datenschutz } from './datenschutz/datenschutz';
import { Dashboard } from './dashboard/dashboard';
import { Profil } from './profil/profil';
import { authGuard } from './guards/auth-guard'; // dein AuthGuard
import { NewJobOffer } from './new-job-offer/new-job-offer';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Startpage },
  { path: 'startpage', component: Startpage },
  { path: 'newjo', component: NewJobOffer },
  { path: 'imprint', component: Imprint },
  { path: 'datenschutz', component: Datenschutz },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'profil', component: Profil, canActivate: [authGuard] },
  { path: '**', redirectTo: 'startpage' } // Fallback auf Startpage
];
