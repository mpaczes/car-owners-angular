import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesByOwnerComponent } from './vehicles-by-owner.component';

xdescribe('VehiclesByOwnerComponent', () => {
  let component: VehiclesByOwnerComponent;
  let fixture: ComponentFixture<VehiclesByOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesByOwnerComponent]
    });
    fixture = TestBed.createComponent(VehiclesByOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
