import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let httpMock: HttpTestingController;

  const mockCompanies= [
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CompaniesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Company[]>', () => {
    service.getCompanies().subscribe(companies => {
      expect(companies.length).toBe(2);
      expect(companies).toEqual(mockCompanies);
    });
    const request = httpMock.expectOne( `${service['basePath']}/companies`);
    expect(request.request.method).toBe('GET');
    request.flush(mockCompanies);
  });


});
