import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { Movie } from '../../../core/models/movie';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies-screen',
  templateUrl: './movies-screen.component.html',
  styleUrls: ['./movies-screen.component.css']
})
export class MoviesScreenComponent {

  movies: Movie[] = [];
  contentLoaded: boolean = false;
  subscription!: Subscription;

  constructor(private movieService: MoviesService,
              private router: Router) {
    this.getMovies();
  }

  getMovies(): void {
    this.subscription = this.movieService.getMovies().subscribe({
      next: (movies: Movie[]) => {
        if ( movies?.length > 0 ) {
          this.contentLoaded = true;
          this.movies = movies;
        } else {
          this.contentLoaded = true;
          Swal.fire('info', 'No se han encontrado películas', 'info');
        }
      },
      error: error => {       
        Swal.fire('error', 'Error al cargar los datos ' + error.statusText, 'error');
      }
    });
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  handleCreateMovie(): void {
    this.router.navigate(['movies/new-movie']);
  }

}
