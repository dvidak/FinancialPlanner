import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComThreeComponent } from './com-three.component';

describe('ComThreeComponent', () => {
  let component: ComThreeComponent;
  let fixture: ComponentFixture<ComThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
