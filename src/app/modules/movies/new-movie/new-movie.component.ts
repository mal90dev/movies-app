import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
export class NewMovieComponent {
  
  @ViewChild('actorInput') actorInput!: ElementRef<HTMLInputElement>;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredActors: Observable<string[]>;
  actors: ActorSelect[] = [];
  allActors: any = [];
  movieGroup!: FormGroup;
  genres: Genre[] = [];

  constructor(private moviesService: MoviesService,
              private actorsService:ActorsService) {
    this.initFormGroup();
    this.getActors();
    this.filteredActors = this.movieGroup.controls['actors'].valueChanges.pipe(
      startWith(null),
      map((actor: string | null) => (actor ? this._filter(actor) : this.allActors.slice())),
    );
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

  onSubmit() {
    this.addMovie();
  }

  addMovie(): void {
    const movie: Movie = {
      title: this.movieGroup.get('title')!.value,
      poster: this.movieGroup.get('poster')!.value,
      genre: this.getNameGenres(this.genres),
      actors: this.getIdsActors(this.actors),
      year: this.movieGroup.get('year')!.value,
      duration: this.movieGroup.get('duration')!.value,
      imdbRating: this.movieGroup.get('rating')!.value
    };
    this.moviesService.createMovie(movie).subscribe( response => {
      if (response) {
        Swal.fire('Success', 'Película añadida correctamente', 'success');
      } else {
        Swal.fire('Error', 'Ha habido algún problema', 'error');
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

  removeGenre(fruit: Genre): void {
    const index = this.genres.indexOf(fruit);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

}
