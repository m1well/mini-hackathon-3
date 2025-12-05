import { Component, ChangeDetectorRef, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobOffer, JobOfferService } from '../services/joboffer.service';
import { UserSessionService } from '../services/user-session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  offers: JobOffer[] = [];
  selectedOffer: JobOffer | null = null;

  constructor(
    private jobOfferService: JobOfferService,
    private userSession: UserSessionService,
    private cd: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

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
