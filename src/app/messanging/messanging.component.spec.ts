import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessangingComponent } from './messanging.component';

describe('MessangingComponent', () => {
  let component: MessangingComponent;
  let fixture: ComponentFixture<MessangingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessangingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessangingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
