import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private basePath = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getActors(): Observable<Actor[]>{
    return this.http.get<Actor[]>(this.basePath + '/actors');
  }

  getActorById(actorId: number): Observable<Actor>{
    return this.http.get<Actor>(this.basePath + '/actors/' + actorId);
  }
}
