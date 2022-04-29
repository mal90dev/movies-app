import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url + '/movies');
  }
}
