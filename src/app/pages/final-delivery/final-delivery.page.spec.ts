import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDeliveryPage } from './final-delivery.page';

describe('FinalDeliveryPage', () => {
  let component: FinalDeliveryPage;
  let fixture: ComponentFixture<FinalDeliveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalDeliveryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalDeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
