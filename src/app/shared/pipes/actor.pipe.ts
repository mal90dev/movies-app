import { Pipe, PipeTransform } from '@angular/core';
import { Actor } from '../../core/models/actor';

@Pipe({
  name: 'pipeActor'
})
export class ActorPipe implements PipeTransform {

  transform(id: number, listActors: Actor[]): string {
    let fullName = '';
    listActors.find( (actor: Actor) => {
      if( actor.id === id ) {
        fullName = `${actor.first_name} ${actor.last_name}`;
      }
    });
    return fullName;
  }

}
