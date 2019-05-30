import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiendFriendsComponent } from './fiend-friends.component';

describe('FiendFriendsComponent', () => {
  let component: FiendFriendsComponent;
  let fixture: ComponentFixture<FiendFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiendFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiendFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
