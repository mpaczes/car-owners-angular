import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleByVinNumberComponent } from './vehicle-by-vin-number.component';

describe('VehicleByVinNumberComponent', () => {
  let component: VehicleByVinNumberComponent;
  let fixture: ComponentFixture<VehicleByVinNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleByVinNumberComponent]
    });
    fixture = TestBed.createComponent(VehicleByVinNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
