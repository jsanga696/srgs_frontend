import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradoListComponent } from './asegurado-list.component';

describe('AseguradoListComponent', () => {
  let component: AseguradoListComponent;
  let fixture: ComponentFixture<AseguradoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AseguradoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
