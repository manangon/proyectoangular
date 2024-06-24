import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditCarComponent } from './new-edit-car.component';

describe('NewEditCarComponent', () => {
  let component: NewEditCarComponent;
  let fixture: ComponentFixture<NewEditCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEditCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewEditCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
