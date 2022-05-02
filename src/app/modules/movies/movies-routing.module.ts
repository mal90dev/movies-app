import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviesScreenComponent } from './movies-screen/movies-screen.component';
import { NewMovieComponent } from './new-movie/new-movie.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesScreenComponent,
  },
  {
    path: 'detail/:id',
    component: MovieDetailComponent
  },
  {
    path: 'new-movie',
    component: NewMovieComponent
  },
  {
    path: 'edit/:id',
    component: NewMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
