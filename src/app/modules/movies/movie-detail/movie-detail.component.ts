import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../../core/models/company';
import { ActorsService } from '../../../core/providers/actors/actors.service';
import { Actor } from '../../../core/models/actor';
import { Movie } from '../../../core/models/movie';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { CompaniesService } from '../../../core/providers/companies/companies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  movieId: number;
  movie!: Movie | undefined;
  actors!: Actor[];
  companies!: Company[];

  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService,
               private actorsService: ActorsService,
               private companiesService: CompaniesService,
               private router: Router ) {
    
    this.movieId = this.getIdParam();
    this.actors = [];
    this.getMovie();
    this.getActors();
    this.getCompanies();
  }

  getIdParam(): number {
    return this.activatedRoute.snapshot.params['id'];
  }

  getMovie(): void {
    this.movie = undefined;
    this.moviesService.getMovieById(this.movieId).subscribe({
      next: (movie: Movie) => {        
        if ( movie ) {
          this.movie = movie;
        } else {
          Swal.fire('info', 'No se ha encontrado la película', 'info');
        }
      },
      error: error => {       
        Swal.fire('error', 'Error al cargar los datos ' + error.statusText, 'error');
      }
    });
  }

  getActors(): void {
    this.actorsService.getActors().subscribe({
      next: (actors: Actor[]) => {
        if ( actors?.length > 0 ) {
          this.actors = actors;
        } else {
          Swal.fire('info', 'No se ha encontrado actores', 'info');
        }
      },
      error: error => {       
        Swal.fire('error', 'Error al cargar los datos ' + error.statusText, 'error');
      }
    });
  }

  getCompanies(): void {
    this.companies = [];
    this.companiesService.getCompanies().subscribe({
      next: (companies: Company[]) => {
        if ( companies?.length > 0 ) {
          this.companies = companies;
        } else {
          Swal.fire('info', 'No se ha encontrado estudios', 'info');
        }
      },
      error: error => {       
        Swal.fire('error', 'Error al cargar los datos ' + error.statusText, 'error');
      }
    });
  }

  handleEditMovie(): void {
    this.router.navigate(['movies/edit', this.movie?.id]);
  }

  handleRemoveMovie(): void {
    this.moviesService.deleteMovie(this.movie?.id!).subscribe({
      next: () => {
        Swal.fire('success', 'Película eliminada', 'success');
        this.router.navigate(['movies']);
      },
      error: error => {
        Swal.fire('error', 'Error al eliminar la película ' + error.statusText, 'error');
      }
    });    
  }

}
