import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobOffer } from '@/shared/model';
import { JobOfferService } from '@/core/services/joboffer.service';
import { UserSessionService } from '@/core/services/user-session.service';
import { NgClass } from '@angular/common';
import { JobDetails } from '@/components/job-details/job-details';

@Component({
  selector: 'app-main',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgClass,
    JobDetails
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
  ) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const code = this.userSession.getUserCode();
    if (code) {
      this.offers = await this.jobOfferService.getOffers(code);
      this.cd.detectChanges();
    }
  }

  toggleDetails(offer: JobOffer) {
    this.selectedOffer = this.selectedOffer === offer ? null : offer;
  }

}
