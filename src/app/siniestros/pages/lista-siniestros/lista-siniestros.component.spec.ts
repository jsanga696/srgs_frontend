import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSiniestrosComponent } from './lista-siniestros.component';

describe('ListaSiniestrosComponent', () => {
  let component: ListaSiniestrosComponent;
  let fixture: ComponentFixture<ListaSiniestrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSiniestrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
