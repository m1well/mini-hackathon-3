import {Component, inject} from '@angular/core';
import {Api} from '@/core/services/api';
import {rxResource} from '@angular/core/rxjs-interop';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    DatePipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  private api = inject(Api);

  readonly util = rxResource({
    stream: () => this.api.getServiceUtil(),
  });
}
