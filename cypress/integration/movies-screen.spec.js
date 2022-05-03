/// <reference types="Cypress" />
 

it('must be exist create new movie button', () => {
  cy.visit('http://localhost:4200/movies' );
  cy.get('mat-icon.movie__icon').should('exist');
});
