import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRepositoryComponent } from './search-repository.component';

describe('SearchRepositoryComponent', () => {
  let component: SearchRepositoryComponent;
  let fixture: ComponentFixture<SearchRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRepositoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
