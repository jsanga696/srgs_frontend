import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeritajeListComponent } from './peritaje-list.component';

describe('PeritajeListComponent', () => {
  let component: PeritajeListComponent;
  let fixture: ComponentFixture<PeritajeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeritajeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeritajeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
