import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOwnerComponent } from './delete-owner.component';

xdescribe('DeleteOwnerComponent', () => {
  let component: DeleteOwnerComponent;
  let fixture: ComponentFixture<DeleteOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteOwnerComponent]
    });
    fixture = TestBed.createComponent(DeleteOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
