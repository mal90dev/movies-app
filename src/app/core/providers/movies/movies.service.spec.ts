import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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

  it('should return an Observable<Movie[]>', () => {
    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(mockMovies);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies`);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovies);
  });

  it('should return an Observable<Actor>', () => {
    service.getMovieById(1).subscribe(actors => {
      expect(actors.title).toBe('Dancing Lady');
      expect(actors).toEqual(mockMovies[0]);
    });
    const request = httpMock.expectOne( `${service['basePath']}/movies/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockMovies[0]);
  });

});
