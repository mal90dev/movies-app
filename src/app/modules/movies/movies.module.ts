import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesScreenComponent } from './movies-screen/movies-screen.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewMovieComponent } from './new-movie/new-movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MovieCardSkeletonComponent } from './movie-card-skeleton/movie-card-skeleton.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MoviesScreenComponent,
    MovieCardComponent,
    MovieDetailComponent,
    NewMovieComponent,
    MovieCardSkeletonComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
