import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontapgeComponent } from './frontapge.component';

describe('FrontapgeComponent', () => {
  let component: FrontapgeComponent;
  let fixture: ComponentFixture<FrontapgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontapgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrontapgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
