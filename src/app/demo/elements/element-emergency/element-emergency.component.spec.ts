import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementEmergencyComponent } from './element-emergency.component';

describe('ElementColorComponent', () => {
  let component: ElementEmergencyComponent;
  let fixture: ComponentFixture<ElementEmergencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementEmergencyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ElementEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
