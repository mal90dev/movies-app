/// <reference types="Cypress" />

it('new movie button must navigate to movies/edit', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('mat-icon.movie__icon').click();
  cy.url().should('include', '/movies/new-movie');
});

it('new movie must be save and return to /movies', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('mat-icon.movie__icon').click();
  cy.get('button.new-movie__button').click();
  cy.url().should('include', '/movies');
});
