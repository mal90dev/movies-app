import { Actor } from '../../core/models/actor';
import { ActorPipe } from './actor.pipe';

describe('ActorPipe', () => {

  const listActors: Actor[] = [
    {
      id: 1,
      first_name: 'Chris',
      last_name: 'Evans',
      gender: "Male",
      bornCity: "Fulong",
      birthdate: "04/09/1979",
      img: "https://dummyimage.com/600x400.png/bf12fd/ffffff",
      rating: 9.82,
      movies: [5, 9]
    },
    {
      id: 2,
      first_name: 'Robert',
      last_name: 'Downey Jr.',
      gender: "Male",
      bornCity: "Fulong",
      birthdate: "04/09/1979",
      img: "https://dummyimage.com/600x400.png/bf12fd/ffffff",
      rating: 9.82,
      movies: [5, 9]
    }
  ];

  it('create an instance', () => {
    const pipe = new ActorPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the full name of the actor', () => {
    const pipe = new ActorPipe();
    expect(pipe.transform(1, listActors)).toBe('Chris Evans');
    expect(pipe.transform(2, listActors)).toBe('Robert Downey Jr.');
  });

  it('should return empty string', () => {
    const pipe = new ActorPipe();
    expect(pipe.transform(3, listActors)).toBe('');
  });

});
