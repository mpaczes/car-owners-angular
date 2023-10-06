import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VehicleComponent } from './vehicle.component';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IVehicle } from 'src/vehicle/interfaces/ivehicle';

describe('component VehicleComponent test suite', () => {
  let component: VehicleComponent;
  let fixture: ComponentFixture<VehicleComponent>;
  let vehicleService: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleComponent],
      providers: [VehicleService],
      imports: [HttpClientTestingModule]
    });

    fixture = TestBed.createComponent(VehicleComponent);
    component = fixture.componentInstance;

    vehicleService = fixture.debugElement.injector.get(VehicleService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('is list of vehicles set after component creation', fakeAsync(() => {
    let vehicles: IVehicle[] = [
      {owner_id: 1, vin_number: 'test one', brand: 'test one', model: 'test one'},
      {owner_id: 1, vin_number: 'test two', brand: 'test two', model: 'test two'}
    ];
    spyOn(vehicleService, 'getAllVehicles').and.returnValue(of(vehicles));

    component.ngOnInit();
    tick();

    expect(component.vehicles.length).toBe(2);
  }));

});
