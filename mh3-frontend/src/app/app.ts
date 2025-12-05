import { Component, signal } from '@angular/core';
import { Header } from './layout/header/header';
import { Content } from './layout/content/content';
import { Footer } from '@/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [ Header, Content, Footer ],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mh3-frontend');
}
