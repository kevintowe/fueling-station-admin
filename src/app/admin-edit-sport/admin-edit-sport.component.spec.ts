import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditSportComponent } from './admin-edit-sport.component';

describe('AdminEditSportComponent', () => {
  let component: AdminEditSportComponent;
  let fixture: ComponentFixture<AdminEditSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
