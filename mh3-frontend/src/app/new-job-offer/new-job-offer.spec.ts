import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobOffer } from './new-job-offer';

describe('NewJobOffer', () => {
  let component: NewJobOffer;
  let fixture: ComponentFixture<NewJobOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewJobOffer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewJobOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
