import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarCategoryComponent } from './sidbar-category.component';

describe('SidbarCategoryComponent', () => {
  let component: SidbarCategoryComponent;
  let fixture: ComponentFixture<SidbarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidbarCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidbarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
