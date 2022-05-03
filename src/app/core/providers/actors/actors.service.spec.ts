import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActorsService } from './actors.service';

describe('ActorsService', () => {
  let service: ActorsService;
  let httpMock: HttpTestingController;

  const mockActors = [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ActorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Actor[]>', () => {
    service.getActors().subscribe(actors => {
      expect(actors.length).toBe(2);
      expect(actors).toEqual(mockActors);
    });
    const request = httpMock.expectOne( `${service['basePath']}/actors`);
    expect(request.request.method).toBe('GET');
    request.flush(mockActors);
  });

  it('should return an Observable<Actor>', () => {
    service.getActorById(1).subscribe(actors => {
      expect(actors.bornCity).toBe('Ciduren');
      expect(actors).toEqual(mockActors[0]);
    });
    const request = httpMock.expectOne( `${service['basePath']}/actors/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockActors[0]);
  });

});
