import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVendorInfoComponent } from './edit-vendor-info.component';

describe('EditVendorInfoComponent', () => {
  let component: EditVendorInfoComponent;
  let fixture: ComponentFixture<EditVendorInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVendorInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVendorInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
