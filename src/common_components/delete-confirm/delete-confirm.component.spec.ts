import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DeleteConfirmComponent } from './delete-confirm.component';

describe('component DeleteConfirmComponent test suite', () => {
  let component: DeleteConfirmComponent;
  let fixture: ComponentFixture<DeleteConfirmComponent>;
  let closeBtnEl: DebugElement;
  let deleteBtnEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmComponent]
    });

    fixture = TestBed.createComponent(DeleteConfirmComponent);
    component = fixture.componentInstance;
    component.owner_id = 1;

    fixture.detectChanges();

    closeBtnEl = fixture.debugElement.query(By.css('button[id=close_1]'));
    deleteBtnEl = fixture.debugElement.query(By.css('button[id=delete_1]'));
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('button close should emit close event', () => {
    let messageSnedByCloseBtn: {message: string, owner_id?: number} = {message: ''};

    component.deleteConfirmOutputMessage.subscribe((message) => messageSnedByCloseBtn = message);

    closeBtnEl.triggerEventHandler('click', null);

    expect(messageSnedByCloseBtn.message).toBe('CLOSE');
    expect(messageSnedByCloseBtn.owner_id).toBe(1);
  });


  it('button delete should emit delete event', () => {
    let messageSnedByDeleteBtn: {message: string, owner_id?: number} = {message: ''};

    component.deleteConfirmOutputMessage.subscribe((message) => messageSnedByDeleteBtn = message);

    deleteBtnEl.triggerEventHandler('click', null);

    expect(messageSnedByDeleteBtn.message).toBe('DELETE');
    expect(messageSnedByDeleteBtn.owner_id).toBe(1);
  });

});
