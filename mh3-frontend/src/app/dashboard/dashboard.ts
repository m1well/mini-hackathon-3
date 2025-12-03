import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  toggleDetails() {
  const detail = document.getElementById("detailSection");
  detail?.classList.toggle("hidden");
}

}
