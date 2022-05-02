import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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

  createMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.basePath + '/movies', movie);
  }

  updateMovie(movie: Movie, movieId: number): Observable<Movie>{
    return this.http.put<Movie>(this.basePath + '/movies/' + movieId, movie);
  }

  deleteMovie(movieId: number): Observable<Movie>{
    return this.http.delete<Movie>(this.basePath + '/movies/' + movieId);
  }

}
