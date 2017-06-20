import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextShatterComponent } from './text-shatter.component';

describe('TextShatterComponent', () => {
  let component: TextShatterComponent;
  let fixture: ComponentFixture<TextShatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextShatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextShatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
