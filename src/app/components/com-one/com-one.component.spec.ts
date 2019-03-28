import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComOneComponent } from './com-one.component';

describe('ComOneComponent', () => {
  let component: ComOneComponent;
  let fixture: ComponentFixture<ComOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
