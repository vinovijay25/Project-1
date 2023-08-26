import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Setting3Component } from './setting3.component';

describe('Setting3Component', () => {
  let component: Setting3Component;
  let fixture: ComponentFixture<Setting3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Setting3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Setting3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
