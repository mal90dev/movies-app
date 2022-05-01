import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  const routes: Routes = [
    {
      path: 'movies/detail/:id',
      component: MovieDetailComponent
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should been call router.navigate with id', () => {
    spyOn(component, 'handleMovieDetail').and.callThrough();
    component.movie = {
      id: 1,
      title: "Dancing Lady",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Musical", "Romance"],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6]
    };
    fixture.detectChanges();
    let element = fixture.debugElement.query(By.css('.card__content'));
    element.triggerEventHandler('click', null);
    expect(component.handleMovieDetail).toHaveBeenCalledWith(1);
  });

});
