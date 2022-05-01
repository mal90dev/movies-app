import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../../core/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: Movie;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  handleMovieDetail(id: number): void {
    this.router.navigate(['movies/detail', id]);
  }

}
