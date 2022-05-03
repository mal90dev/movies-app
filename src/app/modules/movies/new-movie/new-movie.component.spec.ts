import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Actor } from '../../../core/models/actor';
import { Movie } from '../../../core/models/movie';
import { ActorsService } from '../../../core/providers/actors/actors.service';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { MaterialModule } from '../../../shared/modules/material/material.module';
import { SharedModule } from '../../../shared/shared.module';
import Swal from 'sweetalert2';

import { NewMovieComponent } from './new-movie.component';
import { MoviesScreenComponent } from '../movies-screen/movies-screen.component';
import { ActorSelect } from '../../../core/models/actorSelect';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Genre } from 'src/app/core/models/genreSelect';

describe('NewMovieComponent', () => {
  let component: NewMovieComponent;
  let fixture: ComponentFixture<NewMovieComponent>;
  let mockMovieService: Movie;
  let mockActorsService: Actor[];
  let moviesService: MoviesService;
  let actorsService: ActorsService;
  let getMoviesSpy: any;
  let getActorsSpy: any;
  let moviesServiceSpy: any;
  let actorsServiceSpy: any;

  mockMovieService = {
    id: 1,
    title: "Dancing Lady",
    poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
    genre: ["Comedy", "Musical", "Romance"],
    year: 2006,
    duration: 161,
    imdbRating: 8.27,
    actors: [1, 2]
  };

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
    moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovies', 'getMovieById', 'deleteMovie', 'updateMovie', 'createMovie']);
    actorsServiceSpy = jasmine.createSpyObj('ActorService', ['getActors']);
    getMoviesSpy = moviesServiceSpy.getMovieById.and.returnValue(of(mockMovieService));
    getActorsSpy = actorsServiceSpy.getActors.and.returnValue(of(mockActorsService));
    
    const routes: Routes = [
      {
        path: 'movies',
        component: MoviesScreenComponent
      }
    ];

    await TestBed.configureTestingModule({
      declarations: [ NewMovieComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        MaterialModule,
        SharedModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: ActorsService, useValue: actorsServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {id: 1}}}
        },
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
    moviesService = TestBed.inject(MoviesService);
    actorsService = TestBed.inject(ActorsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Tests in getMovie()', () => {
  
    it('should get 1 movie', () => {
      component.movieId = 1;
      component.getMovie();
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

  });

  describe('Test in loadFormGroup', () => {

    it('should load the form group', () => {
      component.loadFormGroup();      
      expect(component.movieGroup.get('title').value).toEqual('Dancing Lady');
      expect(component.showSpinner).toBeFalsy();
      expect(component.genres).toBeDefined();
      expect(component.actors).toBeDefined();
      expect(component.movieGroup.enabled).toBeTruthy();
    });

  });

  it('getActorById must be return ActorSelect', () => {
    expect(component.getActorById(1)).toEqual({fullName: 'Isaak McQuode', id: 1});
  });

  it('getActorsFromMovie must be return ActorSelect[]', () => {
    const actors = [
      {
        fullName: 'Isaak McQuode', 
        id: 1}, 
      {
        fullName: 'Rory Chanders', 
        id: 2
      }
    ];
    expect(component.getActorsFromMovie(mockMovieService)).toEqual(actors);
  });

  it('getIdParam must be return number', () => {

    expect(component.getIdParam()).toBe(1);
  });

  it('initFormGroup must be initializer', () => {
    component.initFormGroup();   
    expect(component.movieGroup.get('title').value).toBe('');
    expect(component.movieGroup.get('poster').value).toBe('');
    expect(component.movieGroup.get('genre').value).toBe('');
    expect(component.movieGroup.get('actors').value).toBe('');
    expect(component.movieGroup.get('studio').value).toBe('');
    expect(component.movieGroup.get('year').value).toBe('');
    expect(component.movieGroup.get('duration').value).toBe('');
    expect(component.movieGroup.get('rating').value).toBe('');
  });

  describe('Test in onSubmit, updateMovie and createMovie', () => { 
    
    it('must be call createMovie', () => {
      spyOn(component, 'createMovie');
      component.movieId = undefined;
      moviesServiceSpy.createMovie.and.returnValue(of(''));
      component.onSubmit();
      expect(component.createMovie).toHaveBeenCalled();
    });

    it('must be call Swal success', () => {
      const spy = spyOn(Swal, 'fire');
      component.movieId = undefined;
      moviesServiceSpy.createMovie.and.returnValue(of(''));
      component.onSubmit();
      expect(spy).toHaveBeenCalledWith('Success', 'Película añadida correctamente', 'success');
    });

    it('must be call Swal error', () => {
      const spy = spyOn(Swal, 'fire');
      const error = new HttpErrorResponse(
        { status: 400, statusText: 'statusText testing' });
      component.movieId = undefined;
      moviesServiceSpy.createMovie.and.returnValue(throwError(() => error));
      component.onSubmit();
      expect(spy).toHaveBeenCalledWith('Error', 'Ha habido algún problema statusText testing', 'error');
    });


    it('must be call updateMovie', () => {
      spyOn(component, 'updateMovie');
      component.movieId = 1;
      moviesServiceSpy.updateMovie.and.returnValue(of(''));
      component.onSubmit();
      expect(component.updateMovie).toHaveBeenCalled();
    });

    it('must be call Swal success', () => {
      const spy = spyOn(Swal, 'fire');
      component.movieId = 1;
      moviesServiceSpy.updateMovie.and.returnValue(of(''));
      component.onSubmit();
      expect(spy).toHaveBeenCalledWith('success', 'Se ha actualizado correctamente', 'success');
    });

    it('must be call Swal error', () => {
      const spy = spyOn(Swal, 'fire');
      const error = new HttpErrorResponse(
        { status: 400, statusText: 'statusText testing' });
      component.movieId = 1;
      moviesServiceSpy.updateMovie.and.returnValue(throwError(() => error));
      component.onSubmit();
      expect(spy).toHaveBeenCalledWith('error', 'Error al actualizar la película statusText testing', 'error');
    });

  });

  describe('Tests in getActors()', () => { 

    it('should have a actors array (constructor)', () => {
      expect(component.actors).toBeDefined();
    });

    it('should get 2 actors', () => {
      component.getActors();
      expect(component.actors.length).toBe(2);
    });

    it('should get 0 actors', () => {
      component.actors = [];
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

  it('getAllActors, allActors must be length 2', () => {
    component.allActors = [];
    component.getAllActors(mockActorsService);
    expect(component.allActors.length).toBe(2);
  });

  it('getFullNameActor, must be return fullName and id of Actor', () => {
    expect(component.getFullNameActor(mockActorsService[1])).toEqual({fullName: 'Rory Chanders', id: 2});
  });

  it('getIdsActors, must be return an id of Actor', () => {
    const actor = [
      {
        fullName: 'Isaak McQuode',
        id: 1
      },
      {
        fullName: 'Mario McQuode',
        id: 5
      }
    ];
    expect(component.getIdsActors(actor)).toEqual([1, 5]);
  });

  it('getNameGenres, must be return string[]', () => {
    const genres = [
      {
        name: 'Action'
      },
      {
        name: 'Comedy'
      }
    ];
    expect(component.getNameGenres(genres)).toEqual(['Action', 'Comedy']);
  });

  describe('Test in add method', () => { 
    it('must be set movieGroup control actor to null and actors.length = 1', () => {
      const event = {
        value: 'Name',
        chipInput: {
          clear: () => { }
        }
      }
      component.actors = [];
      component.add(event as any);      
      expect(component.actors.length).toBe(1);
      expect(component.movieGroup.get('actors').value).toBeNull();
    });

    it('actors.length must be equal []', () => {
      const event = {
        value: '',
        chipInput: {
          clear: () => { }
        }
      }
      component.actors = [];
      component.add(event as any);      
      expect(component.actors).toEqual([]);
    });
  });

  describe('Test in remove()', () => { 
    it('must be remove actor', () => {
      component.remove(component.actors[0]);
      expect(component.actors.length).toBe(1);
    });  
    it('lactors.length must be 2', () => {
      const actor: ActorSelect = {fullName: 'Isaak McQuode', id: 1};
      component.remove(actor);
      expect(component.actors.length).toBe(2);
    });  
  })

  describe('Test in selected()', () => {
    
    it('must be set movieGroup control actor to null', () => {
      const event: any = {
        option: {
          value: 'Name',
          viewValue: 'viewName'
        }
      };
      component.selected(event);
      expect(component.actorInput.nativeElement.value).toBe('');
      expect(component.movieGroup.get('actors').value).toBeNull();
    });

    it('actors must be length equal 3', () => {
      const event: any = {
        option: {
          value: 'Name',
          viewValue: 'viewName'
        }
      };
      component.selected(event);
      expect(component.actors.length).toBe(3);
    });

  });

  describe('Test in addGenre method', () => { 
    it('must be set movieGroup control actor to null and genres.length = 1', () => {
      const event = {
        value: 'Name',
        chipInput: {
          clear: () => { }
        }
      };
      component.genres = [];
      component.addGenre(event as any);      
      expect(component.genres.length).toBe(1);
    });

    it('genres.length must be equal []', () => {
      const event = {
        value: '',
        chipInput: {
          clear: () => { }
        }
      }
      component.genres = [];
      component.addGenre(event as any);      
      expect(component.genres).toEqual([]);
    });
  });

  describe('Test in removeGenre()', () => { 
    it('must be remove genres', () => {
      component.genres = [
        {name: 'Action'},
        {name: 'Musical'},
        {name: 'Romance'}
      ];
      component.removeGenre(component.genres[0]);
      expect(component.genres.length).toBe(2);
    });  
    it('genres.length must be 2', () => {
      component.genres = [
        {name: 'Action'},
        {name: 'Musical'},
        {name: 'Romance'}
      ];
      const genre: Genre = {name: 'Test'};
      component.removeGenre(genre);
      expect(component.genres.length).toBe(3);
    });  
  })




});
