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

    this.offers = this.offers.filter(o => o.id !== offer.id);
    if (this.selectedOffer?.id === offer.id) this.selectedOffer = null;

    await this.jobOfferService.deleteOffer(uid, offer.id);
  }

  async updateStatus(offer: JobOffer, newStatus: string) {
    offer.status = newStatus;
    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.jobOfferService.updateOffer(uid, offer.id, { status: newStatus });
  }

  async updateComment(offer: JobOffer, comment: string) {
    offer.comment = comment;
    const uid = this.userSession.getUserId();
    if (!uid) return;

    await this.jobOfferService.updateOffer(uid, offer.id, { comment });
  }
}
