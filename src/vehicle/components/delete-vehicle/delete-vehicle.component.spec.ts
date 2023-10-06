import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVehicleComponent } from './delete-vehicle.component';

xdescribe('DeleteVehicleComponent', () => {
  let component: DeleteVehicleComponent;
  let fixture: ComponentFixture<DeleteVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteVehicleComponent]
    });
    fixture = TestBed.createComponent(DeleteVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
