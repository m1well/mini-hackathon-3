import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobOffer } from '@/shared/model';
import { JobOfferService } from '@/core/services/joboffer.service';
import { UserSessionService } from '@/core/services/user-session.service';

@Component({
  selector: 'app-main',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  offers: JobOffer[] = [];
  selectedOffer: JobOffer | null = null;

  constructor(
    private jobOfferService: JobOfferService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
  }

  async ngOnInit() {
    const uid = this.userSession.getUserId() ?? 'fallback';
    this.offers = await this.jobOfferService.getOffers(uid);
    this.cd.detectChanges();
  }

  toggleDetails(offer: JobOffer) {
    this.selectedOffer = this.selectedOffer === offer ? null : offer;
  }

  async deleteOffer(offer: JobOffer) {
    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.jobOfferService.deleteOffer(uid, offer.uniqueKey);
    this.offers = this.offers.filter(o => o.uniqueKey !== offer.uniqueKey);
    if (this.selectedOffer?.uniqueKey === offer.uniqueKey) this.selectedOffer = null;
  }

  async updateStatus(offer: JobOffer, newStatus: string) {
    const uid = this.userSession.getUserId();
    if (!uid) return;

    offer.status = newStatus;
    await this.jobOfferService.updateOffer(uid, offer);
  }

  async updateComment(offer: JobOffer, comment: string) {
    const uid = this.userSession.getUserId();
    if (!uid) return;

    offer.comment = comment;
    await this.jobOfferService.updateOffer(uid, offer);
  }
}
