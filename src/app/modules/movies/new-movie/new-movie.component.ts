import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { MoviesService } from '../../../core/providers/movies/movies.service';
import { ActorsService } from '../../../core/providers/actors/actors.service';
import { Movie } from '../../../core/models/movie';
import { Actor } from '../../../core/models/actor';
import { ActorSelect } from '../../../core/models/actorSelect';
import { Genre } from '../../../core/models/genreSelect';


@Component({
  selector: 'app-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent implements OnInit {
  
  @ViewChild('actorInput') actorInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredActors: Observable<string[]>;
  actors: ActorSelect[] = [];
  allActors: any = [];
  movieGroup!: FormGroup;
  genres: Genre[] = [];
  movieId: number;
  movie!: Movie | undefined;
  showSpinner: boolean = false;

  constructor(private moviesService: MoviesService,
              private actorsService:ActorsService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) {
    this.movieId = this.getIdParam();
    this.initFormGroup();
    this.getActors();
    this.filteredActors = this.movieGroup.controls['actors'].valueChanges.pipe(
      startWith(null),
      map((actor: string | null) => (actor ? this._filter(actor) : this.allActors.slice())),
    );
  }

  ngOnInit(): void {
    if (this.movieId) {
      this.showSpinner = true;
      this.movieGroup.disable();
      this.getMovie();
    }    
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
      },
      complete: () => {
        this.loadFormGroup();
      }
    });
  }

  loadFormGroup(): void {
    this.movieGroup.setValue({
      title: this.movie?.title,
      poster: this.movie?.poster,
      genre: '',
      actors: this.movie?.actors,
      studio: '',
      year: this.movie?.year,
      duration: this.movie?.duration,
      rating: this.movie?.imdbRating
    });
    this.genres = this.getGenresFromMovie(this.movie!);
    this.actors = this.getActorsFromMovie(this.movie!);
    this.showSpinner = false;
    this.movieGroup.enable();
  }

  getGenresFromMovie(movie: Movie): Genre[] {
    const genres: Genre[] = [];
    movie?.genre.map(genre => {
      genres.push({
        name: genre
      });
    });
    return genres;
  }

  getActorById(id: number): ActorSelect {
    return this.allActors.find((actor: Actor) => actor.id === id);
  }

  getActorsFromMovie(movie: Movie): ActorSelect[] {
    const actors: ActorSelect[] = [];
    movie?.actors.forEach(actor => {
      actors.push(this.getActorById(actor));
    });
    return actors;
  }

  getIdParam(): number {
    return this.activatedRoute.snapshot.params['id'];
  }

  initFormGroup() {
    this.movieGroup = new FormGroup({
      title: new FormControl(''),
      poster: new FormControl(''),
      genre: new FormControl(''),
      actors: new FormControl(''),
      studio: new FormControl(''),
      year: new FormControl(''),
      duration: new FormControl(''),
      rating: new FormControl('')
    });
  }

  onSubmit(): void {
    const movie: Movie = {
      title: this.movieGroup.get('title')!.value,
      poster: this.movieGroup.get('poster')!.value,
      genre: this.getNameGenres(this.genres),
      actors: this.getIdsActors(this.actors),
      year: this.movieGroup.get('year')!.value,
      duration: this.movieGroup.get('duration')!.value,
      imdbRating: this.movieGroup.get('rating')!.value
    };
    if (!this.movieId) {
      this.createMovie(movie);
    } else {
      this.updateMovie(movie);
    }
  }

  createMovie(movie: Movie): void {
    this.moviesService.createMovie(movie).subscribe({
      next: (movie: Movie) => {
        Swal.fire('Success', 'Película añadida correctamente', 'success');
        this.router.navigate(['movies']);
      },
      error: error => {       
        Swal.fire('Error', 'Ha habido algún problema ' + error.statusText, 'error');
      }
    });
  }

  updateMovie(movie: Movie): void {
    this.moviesService.updateMovie(movie, this.movieId).subscribe({
      next: (movie: Movie) => {
        Swal.fire('success', 'Se ha actualizado correctamente', 'success');
        this.router.navigate(['movies/detail', movie.id]);
      },
      error: error => {       
        Swal.fire('error', 'Error al actualizar la película ' + error.statusText, 'error');
      }
    });
  }

  getActors(): void {
    this.actorsService.getActors().subscribe({
      next: (actors: Actor[]) => {
        if ( actors?.length > 0 ) {
          this.getAllActors(actors);
        } else {
          Swal.fire('info', 'No se ha encontrado actores', 'info');
        }
      },
      error: error => {       
        Swal.fire('error', 'Error al cargar los datos ' + error.statusText, 'error');
      }
    });
  }

  getAllActors(actors: Actor[]): void {
    actors.forEach(actor => {
      this.allActors.push(this.getFullNameActor(actor));
    });
  }

  getFullNameActor(actor: Actor): object {
    return {
      fullName: `${actor.first_name} ${actor.last_name}`,
      id: actor.id
    }
  }

  getIdsActors(actors: ActorSelect[]): number[] {
    const idsActors: number[] = [];
    actors.forEach((actor: ActorSelect) => {
      idsActors.push(actor.id);
    });
    return idsActors;
  }

  getNameGenres(genres: Genre[]): string[] {
    const nameGenres: string[] = [];
    genres.forEach(genre => {
      nameGenres.push(genre.name);
    });
    return nameGenres;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();    
    if (value) {
      this.actors.push({
        fullName: value,
        id: 0
      });
    }
    event.chipInput!.clear();
    this.movieGroup.get('actors')!.setValue(null);
  }

  remove(actor: ActorSelect): void {
    const index = this.actors.indexOf(actor);
    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {   
    this.actors.push({
        fullName: event.option.viewValue,
        id: event.option.value
    });
    this.actorInput.nativeElement.value = '';
    this.movieGroup.get('actors')!.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.allActors.filter((actor: ActorSelect) => actor.fullName.toLowerCase().includes(filterValue)));
    return this.allActors.filter((actor: ActorSelect) => actor.fullName.toLowerCase().includes(filterValue));
  }

  addGenre(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.genres.push({name: value});
    }
    event.chipInput!.clear();
  }

  removeGenre(genre: Genre): void {
    const index = this.genres.indexOf(genre);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

}
