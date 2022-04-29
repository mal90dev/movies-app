import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesScreenComponent } from './movies-screen/movies-screen.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MoviesRoutingModule } from './movies-routing.module';



@NgModule({
  declarations: [
    MoviesScreenComponent,
    MovieCardComponent,
    MovieDetailComponent,
    NewMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
