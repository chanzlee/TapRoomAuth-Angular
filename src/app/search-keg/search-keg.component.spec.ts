import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchKegComponent } from './search-keg.component';

describe('SearchKegComponent', () => {
  let component: SearchKegComponent;
  let fixture: ComponentFixture<SearchKegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchKegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchKegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
