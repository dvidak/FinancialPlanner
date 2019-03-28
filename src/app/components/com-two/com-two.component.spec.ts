import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComTwoComponent } from './com-two.component';

describe('ComTwoComponent', () => {
  let component: ComTwoComponent;
  let fixture: ComponentFixture<ComTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
