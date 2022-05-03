import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Movie } from '../../models/movie';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  const mockMovies = [
    {
      id: 1,
      title: "Dancing Lady",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Musical", "Romance"],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6],
    },
    {
      id: 4,
      title: "Spring Break Shark Attack",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Adventure", "Drama", "Horror"],
      year: 1985,
      duration: 190,
      imdbRating: 3.66,
      actors: [8, 9, 10]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMovies should return an Observable<Movie[]>', () => {
    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies`);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovies);
  });

  it('getMovieById should return an Observable<Movie>', () => {
    service.getMovieById(1).subscribe(movie => {
      expect(movie.title).toBe('Dancing Lady');
      expect(movie).toEqual(mockMovies[0]);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovies[0]);
  });

  it('createMovie should return an Observable<Movie>', () => {
    const movie: Movie = {
      id: 1,
      title: "Dancing Lady",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Musical", "Romance"],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6]
    }
    service.createMovie(movie).subscribe(movie => {
      expect(movie.title).toBe('Dancing Lady');
      expect(movie).toEqual(mockMovies[0]);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies`);
    expect(request.request.method).toBe('POST');
    request.flush(mockMovies[0]);
  });

  it('updateMovie should return an Observable<Movie>', () => {
    const movie: Movie = {
      id: 1,
      title: "Dancing Lady edit",
      poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
      genre: ["Comedy", "Musical", "Romance"],
      year: 2006,
      duration: 161,
      imdbRating: 8.27,
      actors: [4, 5, 6]
    }
    service.updateMovie(movie, 1).subscribe(movie => {
      expect(movie.title).toBe('Dancing Lady edit');
      expect(movie).toEqual(movie);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(movie);
  });

  it('deleteMovie should return an Observable<Movie>', () => {
    service.deleteMovie(1).subscribe(movie => {
      expect(movie).toBe(true);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(true);
  });

});
