import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRestaurantsComponent } from './browse-restaurants.component';

describe('BrowseRestaurantsComponent', () => {
  let component: BrowseRestaurantsComponent;
  let fixture: ComponentFixture<BrowseRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseRestaurantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
