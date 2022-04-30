import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardSkeletonComponent } from './movie-card-skeleton.component';

describe('MovieCardSkeletonComponent', () => {
  let component: MovieCardSkeletonComponent;
  let fixture: ComponentFixture<MovieCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
