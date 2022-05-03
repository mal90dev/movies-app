/// <reference types="Cypress" />

it('should exist save button', () => {
  cy.intercept('/movies').as('movies')
  cy.visit('http://localhost:4200/movies' );
  cy.wait('@movies')
  cy.get('img.card__img').first().click();
  cy.get('mat-icon#edit-movie').click();
  cy.get('button.new-movie__button').should('exist');
});

it('should save movie and return movies/detail', () => {
  cy.intercept('/movies/*').as('movies')
  cy.visit('http://localhost:4200/movies' );
  cy.get('img.card__img').first().click();
  cy.get('mat-icon#edit-movie').click();
  cy.wait('@movies');
  cy.get('button.new-movie__button', {timeout: 3000}).click();
  cy.url().should('include', '/movies/detail/');
});
