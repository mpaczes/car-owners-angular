import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { VehicleByVinNumberComponent } from './vehicle-by-vin-number.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';
import { of } from 'rxjs';
import { IVehicle } from 'src/vehicle/interfaces/ivehicle';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('component VehicleByVinNumberComponent test suite', () => {
  let component: VehicleByVinNumberComponent;
  let fixture: ComponentFixture<VehicleByVinNumberComponent>;
  let vehicleService: VehicleService;
  let submitBtnEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleByVinNumberComponent],
      providers: [VehicleService],
      imports: [HttpClientTestingModule ]
    });

    fixture = TestBed.createComponent(VehicleByVinNumberComponent);
    component = fixture.componentInstance;

    vehicleService = fixture.debugElement.injector.get(VehicleService);
    submitBtnEl = fixture.debugElement.query(By.css('button[type=submit]'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('is form set up after component creation', fakeAsync(() => {
    spyOn(vehicleService, 'getAllVehiclesVinNumbers').and.returnValue(of(['test one', 'test two']));

    component.ngOnInit();
    tick();

    expect(component.allVinNumbersForm.valid).toBeFalsy();
    expect(component.allVinNumbersForm.controls['vinNumber'].valid).toBeFalsy();
    expect(component.allVeviclesVinNumbers.length).toBe(2);
  }));

  it('is form set up after submit', fakeAsync(() => {
    spyOn(vehicleService, 'getVehicleByVinNumber').and.returnValue(of({
      owner_id: 1, vin_number: 'test one', brand: 'test', model: 'test'
    }));

    spyOn(vehicleService, 'getAllVehiclesVinNumbers').and.returnValue(of(['test one', 'test two']));

    component.ngOnInit();
    tick();

    expect(component.allVeviclesVinNumbers.length).toBe(2);

    component.allVinNumbersForm.controls['vinNumber'].setValue('test one');
    submitBtnEl.triggerEventHandler('click', null);
    tick();

    expect(component.allVinNumbersForm.valid).toBeTruthy();
    expect(component.allVinNumbersForm.value).toBeDefined();

    console.log('component.vehicle', component.vehicle);
    // expect(component.vehicle).toBeDefined();
  }));

});
