import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Company } from '../../../core/models/company';
import { Actor } from '../../../core/models/actor';
import { Movie } from '../../../core/models/movie';
import { ActorsService } from '../../../core/providers/actors/actors.service';
import { CompaniesService } from '../../../core/providers/companies/companies.service';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { MovieDetailComponent } from './movie-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let mockMovieService: Movie;
  let mockCompaniesService: Company[];
  let mockActorsService: Actor[];
  let moviesService: MoviesService;
  let companiesService: CompaniesService;
  let actorsService: ActorsService;
  let activatedRoute: ActivatedRoute;
  let getMoviesSpy: any;
  let getCompaniesSpy: any;
  let getActorsSpy: any;

  mockMovieService = {
    id: 1,
    title: "Dancing Lady",
    poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
    genre: ["Comedy", "Musical", "Romance"],
    year: 2006,
    duration: 161,
    imdbRating: 8.27,
    actors: [4, 5, 6]
  };

  mockCompaniesService = [
    {
      id: 1,
      name: "Jacobson-Dickinson",
      country: "Colombia",
      createYear: 2010,
      employees: 81,
      rating: 4.32,
      movies: [1, 10]
    },
    {
      id: 2,
      name: "Quitzon-Erdman",
      country: "China",
      createYear: 2005,
      employees: 611,
      rating: 8.19,
      movies: [2, 3, 4]
    }
  ];

  mockActorsService = [
    {
      id: 1,
      first_name: "Isaak",
      last_name: "McQuode",
      gender: "Male",
      bornCity: "Ciduren",
      birthdate: "24/12/1957",
      img: "http://dummyimage.com/600x400.png/dddddd/000000",
      rating: 2.03,
      movies: [3, 7]
    },
    {
      id: 2,
      first_name: "Rory",
      last_name: "Chanders",
      gender: "Male",
      bornCity: "Cijengkol",
      birthdate: "19/04/1975",
      img: "http://dummyimage.com/600x400.png/5fa2dd/000000",
      rating: 2.43,
      movies: []
    }
  ];

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies', 'getMovieById']);
    const companiesServiceSpy = jasmine.createSpyObj('ComaniesService', ['getCompanies']);
    const actorsServiceSpy = jasmine.createSpyObj('MoviesService', ['getActors']);
    getMoviesSpy = moviesServiceSpy.getMovieById.and.returnValue(of(mockMovieService));
    getCompaniesSpy = companiesServiceSpy.getCompanies.and.returnValue(of(mockCompaniesService));
    getActorsSpy = actorsServiceSpy.getActors.and.returnValue(of(mockActorsService));

    await TestBed.configureTestingModule({
      declarations: [ 
        MovieDetailComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: CompaniesService, useValue: companiesServiceSpy },
        { provide: ActorsService, useValue: actorsServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {id: 1}}}
        },
      ],
    })
    .compileComponents();
    moviesService = TestBed.inject(MoviesService);
    companiesService = TestBed.inject(CompaniesService);
    actorsService = TestBed.inject(ActorsService);
    activatedRoute = TestBed.inject(ActivatedRoute)
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Tests in getIdParam', () => { 
    it('should get movie by id from url params', () => {
      expect(component.getIdParam()).toBe(1);
    });
  });

  describe('Tests in getMovie()', () => {

    it('should have a movie to init (constructor)', () => {
      expect(component.movie).toBeDefined();
    });
  
    it('should get 1 movie', () => {
      component.getMovie();
      component.movieId = 1;
      expect(component.movie?.title).toBe('Dancing Lady');
    });
  
    it('should get 0 movies', () => {
      const spy = spyOn(Swal, 'fire');
      getMoviesSpy.and.returnValue(of(undefined));
      component.getMovie();
      expect(component.movie).toBeUndefined();
      expect(spy).toHaveBeenCalledWith('info', 'No se ha encontrado la película', 'info');
    });
  
    it('should show error message on the UI', () => {
      const spy = spyOn(Swal, 'fire');
      const error = new HttpErrorResponse(
        { status: 400, statusText: 'statusText testing' });
      getMoviesSpy.and.returnValue(throwError(() => error));
      component.getMovie();
      expect(spy).toHaveBeenCalledWith('error', 'Error al cargar los datos statusText testing', 'error');
    });

   })

  describe('Tests in getActors()', () => { 

    it('should have a actors array (constructor)', () => {
      expect(component.actors).toBeDefined();
    });

    it('should get 2 actors', () => {
      component.getActors();
      expect(component.actors.length).toBe(2);
    });

    it('should get 0 actors', () => {
      getActorsSpy.and.returnValue(of(undefined));
      component.getActors();
      expect(component.actors.length).toBe(0);
    });

    it('should have a empty array', () => {
      const spy = spyOn(Swal, 'fire');
      component.actors = [];
      getActorsSpy.and.returnValue(of([]));
      component.getActors();
      expect(component.actors).toEqual([]);
      expect(spy).toHaveBeenCalledWith('info', 'No se ha encontrado actores', 'info');
    });

    it('should show error message on the UI', () => {
      const spy = spyOn(Swal, 'fire');
      const error = new HttpErrorResponse(
        { status: 400, statusText: 'statusText testing' });
      getActorsSpy.and.returnValue(throwError(() => error));
      component.getActors();
      expect(spy).toHaveBeenCalledWith('error', 'Error al cargar los datos statusText testing', 'error');
    });

  });

  describe('Tests in getCompanies()', () => {

    it('should have a companies array (constructor)', () => {
      expect(component.companies).toBeDefined();
    });

    it('should get 2 companies', () => {
      component.getCompanies();
      expect(component.companies.length).toBe(2);
    });

    it('should get 0 companies', () => {
      getCompaniesSpy.and.returnValue(of(undefined));
      component.getCompanies();
      expect(component.companies.length).toBe(0);
    });

    it('should have a empty array', () => {
      const spy = spyOn(Swal, 'fire');
      component.companies = [];
      getCompaniesSpy.and.returnValue(of([]));
      component.getCompanies();
      expect(component.companies).toEqual([]);
      expect(spy).toHaveBeenCalledWith('info', 'No se ha encontrado estudios', 'info');
    });

    it('should show error message on the UI', () => {
      const spy = spyOn(Swal, 'fire');
      const error = new HttpErrorResponse(
        { status: 400, statusText: 'statusText testing' });
      getCompaniesSpy.and.returnValue(throwError(() => error));
      component.getCompanies();
      expect(spy).toHaveBeenCalledWith('error', 'Error al cargar los datos statusText testing', 'error');
    });

  });


});
