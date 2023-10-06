import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AddVehicleComponent } from './add-vehicle.component';
import { OwnerService } from 'src/owner/services/owner-service.service';
import { VehicleService } from 'src/vehicle/services/vehicle-service.service';
import { IOwner } from 'src/owner/interfaces/iowner';

describe('component AddVehicleComponent test suite', () => {
  let component: AddVehicleComponent;
  let fixture: ComponentFixture<AddVehicleComponent>;
  let vehicleService: VehicleService;
  let ownerService: OwnerService;
  let submitBtnEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVehicleComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      providers: [VehicleService, OwnerService]
    });

    fixture = TestBed.createComponent(AddVehicleComponent);
    component = fixture.componentInstance;

    vehicleService = fixture.debugElement.injector.get(VehicleService);
    ownerService = fixture.debugElement.injector.get(OwnerService);

    submitBtnEl = fixture.debugElement.query(By.css('button[type=submit]'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('VIN number field validity', fakeAsync(() => {
    spyOn(ownerService, 'getAllOwners').and.returnValue(of([]));

    component.ngOnInit();
    tick();

    let vinNumber = component.addVehicleForm.controls['vin_number'];
    expect(vinNumber.valid).toBeFalsy();

    if (vinNumber.errors) {
      expect(vinNumber.errors['required']).toBeTruthy();
    }
  }));

  it('is form invalid after component creation', fakeAsync(() => {
    spyOn(ownerService, 'getAllOwners').and.returnValue(of([
      {first_name: 'test one', last_name: 'test one'},
      {first_name: 'test two', last_name: 'test two'}
    ]));

    component.ngOnInit();
    tick();

    expect(component.addVehicleForm.valid).toBeFalsy();
    expect(component.allOwners.length).toEqual(2);
  }));

  it('check vehicle form afer submitting', fakeAsync(() => {
    spyOn(vehicleService, 'addVehicle').and.returnValue(of('vehicle has been created'));

    spyOn(ownerService, 'getAllOwners').and.returnValue(of([
      {first_name: 'test one', last_name: 'test one'},
      {first_name: 'test two', last_name: 'test two'}
    ]));

    component.ngOnInit();
    tick();

    expect(component.addVehicleForm.valid).toBeFalsy();
    expect(component.allOwners.length).toEqual(2);

    component.addVehicleForm.controls['owner_id'].setValue(1);
    component.addVehicleForm.controls['vin_number'].setValue('test');
    component.addVehicleForm.controls['brand'].setValue('test');
    component.addVehicleForm.controls['model'].setValue('test');

    submitBtnEl.triggerEventHandler('click', null);
    tick();

    expect(component.addVehicleForm.valid).toBeTruthy();
    expect(component.addVehicleForm.value).toBeDefined();
    expect(component.addVehicleForm.controls['owner_id'].value).toBe(1);
  }));

});
