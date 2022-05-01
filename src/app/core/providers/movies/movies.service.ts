import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private basePath = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.basePath + '/movies');
  }

  getMovieById(movieId: number): Observable<Movie>{
    return this.http.get<Movie>(this.basePath + '/movies/' + movieId);
  }

}
