import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertismentManagerComponent } from './advertisment-manager.component';

describe('AdvertismentManagerComponent', () => {
  let component: AdvertismentManagerComponent;
  let fixture: ComponentFixture<AdvertismentManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvertismentManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvertismentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
