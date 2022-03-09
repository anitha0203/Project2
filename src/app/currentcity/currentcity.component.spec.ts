import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentcityComponent } from './currentcity.component';

describe('CurrentcityComponent', () => {
  let component: CurrentcityComponent;
  let fixture: ComponentFixture<CurrentcityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentcityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentcityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
