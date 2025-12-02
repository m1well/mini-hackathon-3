import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJP } from './add-jp';

describe('AddJP', () => {
  let component: AddJP;
  let fixture: ComponentFixture<AddJP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
