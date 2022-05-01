import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesScreenComponent } from './movies-screen.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { Movie } from '../../../core/models/movie';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

describe('MoviesScreenComponent', () => {
  let component: MoviesScreenComponent;
  let fixture: ComponentFixture<MoviesScreenComponent>;
  let mockMoviesService: Movie[];
  let moviesService: MoviesService;
  let getMoviesSpy: any;

  mockMoviesService = [
    {
      id: 1,
      title: "Dancing Lady",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Musical", "Romance"],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6]
    },
    {
      id: 2,
      title: "Mooring, The",
      poster: "http://dummyimage.com/400x600.png/dddddd/000000",
      genre: ["Horror", "Thriller"],
      year: 1987,
      duration: 187,
      imdbRating: 1.99,
      actors: [5, 6]
    }
  ];

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);
    getMoviesSpy = moviesServiceSpy.getMovies.and.returnValue(of(mockMoviesService));

    await TestBed.configureTestingModule({
      declarations: [ MoviesScreenComponent ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ],
    })
    .compileComponents();
    moviesService = TestBed.inject(MoviesService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a movies array (constructor)', () => {
    expect(component.movies).toBeDefined();
  });

  it('should get 2 movies', () => {
    component.movies = [];
    component.getMovies();
    expect(component.movies.length).toBe(2);
  });

  it('should get 0 movies', () => {
    component.movies = [];
    getMoviesSpy.and.returnValue(of(undefined));
    component.getMovies();
    expect(component.movies.length).toBe(0);
  });

  it('should have a empty array', () => {
    const spy = spyOn(Swal, 'fire');
    component.movies = [];
    getMoviesSpy.and.returnValue(of([]));
    component.getMovies();
    expect(component.movies).toEqual([]);
    expect(spy).toHaveBeenCalledWith('info', 'No se han encontrado películas', 'info');
  });

  it('should show error message on the UI', () => {
    const spy = spyOn(Swal, 'fire');
    const error = new HttpErrorResponse(
      { status: 400, statusText: 'statusText testing' });
    getMoviesSpy.and.returnValue(throwError(() => error));
    component.getMovies();
    expect(spy).toHaveBeenCalledWith('error', 'Error al cargar los datos statusText testing', 'error');
  });

  it('should return array.length = 2', () => {
    const array = component.counter(2);
    expect(array.length).toBe(2);
  });

});
