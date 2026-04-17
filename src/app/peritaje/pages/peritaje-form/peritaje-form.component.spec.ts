import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritajeFormComponent } from './peritaje-form.component';

describe('PeritajeFormComponent', () => {
  let component: PeritajeFormComponent;
  let fixture: ComponentFixture<PeritajeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeritajeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeritajeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
