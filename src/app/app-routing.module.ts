import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'actors',
    loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule)
  },
  {
    path: 'studios',
    loadChildren: () => import('./modules/movies/movies.module').then(m => m.MoviesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
