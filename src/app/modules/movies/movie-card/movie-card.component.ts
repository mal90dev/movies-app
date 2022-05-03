import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie!: Movie;

  constructor(private router: Router) { }

  handleMovieDetail(id: number): void {    
    this.router.navigate(['movies/detail', id]);
  }

}
