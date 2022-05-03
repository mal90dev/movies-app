/// <reference types="Cypress" />

it('should navigate to movies/detail', () => {
  cy.visit('http://localhost:4200/movies');
  cy.get('img.card__img').first().click();
  cy.url().should('include', '/movies/detail/');
});

it('should content title, img, actors...', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('img.card__img').first().click();
  cy.get('.movie__title').should('exist');
  cy.get('.movie__statistics').should('exist');
  cy.get('.movie__actors').should('exist');
  cy.get('.movie__genres').should('exist');
});

it('should be edit button...', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('img.card__img').first().click();
  cy.get('mat-icon#edit-movie').should('exist');
});

it('should be remove button...', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('img.card__img').first().click();
  cy.get('mat-icon#remove-movie').should('exist');
});
