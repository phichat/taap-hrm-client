import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLoadWrapperComponent } from './page-load-wrapper.component';

describe('PageLoadWrapperComponent', () => {
  let component: PageLoadWrapperComponent;
  let fixture: ComponentFixture<PageLoadWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLoadWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoadWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
