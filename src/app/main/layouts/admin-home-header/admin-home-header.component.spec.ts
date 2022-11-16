import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeHeaderComponent } from './admin-home-header.component';

describe('HomeHeaderComponent', () => {
  let component: AdminHomeHeaderComponent;
  let fixture: ComponentFixture<AdminHomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
