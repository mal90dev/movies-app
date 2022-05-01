import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../core/models/company';
import { ActorsService } from '../../../core/providers/actors/actors.service';
import { Actor } from '../../../core/models/actor';
import { Movie } from '../../../core/models/movie';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { CompaniesService } from '../../../core/providers/companies/companies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  movieId: number;
  movie!: Movie;
  actors!: Actor[];
  companies!: Company[];

  constructor( private activatedRoute: ActivatedRoute,
               private moviesService: MoviesService,
               private actorsService: ActorsService,
               private companiesService: CompaniesService ) {
    this.movieId = this.getIdParam();
    this.getMovie();
    this.getActors();
    this.getCompanies();
    console.log(this.movieId);
  }

  getIdParam(): number {
    return this.activatedRoute.snapshot.params['id'];
  }

  getMovie() {
    this.moviesService.getMovieById(this.movieId).subscribe( (movie: Movie) => {
      console.log(movie);
      this.movie = movie;
    });
  }

  getActors() {
    this.actorsService.getActors().subscribe( (actors: Actor[]) => {
      console.log(actors);
      this.actors = actors;
    });
  }

  getCompanies() {
    this.companiesService.getCompanies().subscribe( (companies: Company[]) => {
      console.log('companies: ', companies);
      this.companies = companies;
    });
  }


}
