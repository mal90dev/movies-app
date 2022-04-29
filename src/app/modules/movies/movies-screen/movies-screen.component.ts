import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { MoviesService } from 'src/app/core/providers/movies/movies.service';

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css']
})
export class MoviesScreenComponent {

  movies: Movie[] = [];
  movie!: Movie;

  constructor(private readonly movieService: MoviesService) {
    this.movieService.getMovies().subscribe( (movies: Movie[])  => {
      console.log(movies);
      this.movies = movies;
      this.movie = movies[0];
    });
  }


}
