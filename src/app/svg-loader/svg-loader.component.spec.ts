import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgLoaderComponent } from './svg-loader.component';

describe('SvgLoaderComponent', () => {
  let component: SvgLoaderComponent;
  let fixture: ComponentFixture<SvgLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
