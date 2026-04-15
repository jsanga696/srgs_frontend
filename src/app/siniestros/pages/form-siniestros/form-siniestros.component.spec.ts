import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSiniestrosComponent } from './form-siniestros.component';

describe('FormSiniestrosComponent', () => {
  let component: FormSiniestrosComponent;
  let fixture: ComponentFixture<FormSiniestrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSiniestrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
