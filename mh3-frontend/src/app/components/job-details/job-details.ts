import { Component, inject, input, signal } from '@angular/core';
import { JobOffer } from '@/shared/model';
import { UserSessionService } from '@/core/services/user-session.service';
import { JobOfferService } from '@/core/services/joboffer.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-job-details',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './job-details.html',
})
export class JobDetails {
  offer = input.required<JobOffer>();

  private session = inject(UserSessionService);
  private jobOfferService = inject(JobOfferService);

  isSaving = signal(false);
  isSavedSuccess = signal(false);

  async saveChanges() { // Kein Parameter nötig, wir haben ja this.offer()
    const code = this.session.getUserCode();
    if (!code) return;

    this.isSaving.set(true);
    this.isSavedSuccess.set(false);

    try {
      await this.jobOfferService.updateOffer(code, this.offer());

      this.isSavedSuccess.set(true);

      setTimeout(() => {
        this.isSavedSuccess.set(false);
      }, 2000);

    } catch (e) {
      console.error('Fehler beim Speichern', e);
      alert('Fehler beim Speichern!');
    } finally {
      this.isSaving.set(false);
    }
  }


  isEditingSocial = signal(false);

  startEditLinks() {
    this.isEditingSocial.set(true);
  }

  finishEditLinks() {
    this.isEditingSocial.set(false);
  }

}
