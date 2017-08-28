import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemImageComponent } from './edit-item-image.component';

describe('EditItemImageComponent', () => {
  let component: EditItemImageComponent;
  let fixture: ComponentFixture<EditItemImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
