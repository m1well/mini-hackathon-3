import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface JobOffer {
  id: string; // eindeutige ID für jedes Angebot
  name: string;
  location: string;
  salaryRange: string;
  matchScore: number;
  summary: string;
  techStack: string[];
  benefits: {
    tasks: string;
    workingModel: string;
    experience: string;
    benefits: string;
    culture: string;
  };
  matchReasoning: string;
  status: string;
  comment: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  endpointGetOffers = 'https://backend.example.com/offers';
  endpointDeleteOffer = 'https://backend.example.com/offers/delete';
  endpointUpdateOffer = 'https://backend.example.com/offers/update';

  offers: JobOffer[] = [];
  selectedOffer: JobOffer | null = null;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    const uid = localStorage.getItem('uid');

    if (!uid) {
      console.warn("Keine UID im LocalStorage gefunden, Testfallback wird genutzt.");
      this.setFallback();
      return;
    }

    fetch(`${this.endpointGetOffers}?uid=${uid}`)
      .then(res => {
        if (!res.ok) throw new Error("Backend Fehler");
        return res.json();
      })
      .then((data: JobOffer[]) => {
        // Kommentar und Status initialisieren, falls undefined
        this.offers = data.map(offer => ({
          ...offer,
          comment: offer.comment ?? '',
          status: offer.status ?? 'NEU'
        }));
      })
      .catch(() => {
        console.warn("Backend nicht erreichbar, Testfallback wird genutzt.");
        this.setFallback();
      });
  }

  setFallback() {
    this.offers = [
      {
        id: '1',
        name: 'it factum',
        location: 'München / Remote',
        salaryRange: '45.000 € - 70.000 €',
        matchScore: 90,
        summary: "it factum sucht einen Java Full Stack Entwickler (m/w/d)...",
        techStack: ["Java", "Spring Boot", "Kotlin", "Jakarta EE", "Angular", "React"],
        benefits: {
          tasks: "Neu- und Weiterentwicklung von Anwendungen im Java-Ökosystem...",
          workingModel: "Teil-/Vollzeit, Home-Office möglich",
          experience: "Mehrjährige Erfahrung in objektorientierter Java-Entwicklung",
          benefits: "Unbefristeter Vertrag, Weiterbildungsmöglichkeiten, Firmenwagen",
          culture: "Teamorientierte, offene Kultur mit Humor"
        },
        matchReasoning: "Sehr guter technischer Fit: Du bringst 7 Jahre Erfahrung...",
        status: "NEU",
        comment: ""
      }
    ];
    this.cd.detectChanges();
  }

  toggleDetails(offer: JobOffer) {
    this.selectedOffer = this.selectedOffer === offer ? null : offer;
  }

  deleteOffer(offer: JobOffer) {
    const uid = localStorage.getItem('uid');

    // Entferne lokal
    this.offers = this.offers.filter(o => o.id !== offer.id);
    if (this.selectedOffer?.id === offer.id) this.selectedOffer = null;

    // Backend-Platzhalter
    fetch(this.endpointDeleteOffer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, offerId: offer.id })
    }).catch(() => console.warn("Delete Offer Backend Platzhalter"));
  }

  updateStatus(offer: JobOffer, newStatus: string) {
    offer.status = newStatus;
    const uid = localStorage.getItem('uid');

    fetch(this.endpointUpdateOffer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, offerId: offer.id, status: newStatus })
    }).catch(() => console.warn("Update Status Backend Platzhalter"));
  }

  updateComment(offer: JobOffer, comment: string) {
    offer.comment = comment;
    const uid = localStorage.getItem('uid');

    fetch(this.endpointUpdateOffer, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, offerId: offer.id, comment })
    }).catch(() => console.warn("Update Comment Backend Platzhalter"));
  }
}
