/// <reference types="Cypress" />
 
it('should visit movies screen to click movie app button navbar', () => {
    cy.visit('http://localhost:4200');
    cy.get('a.toolbar__link').first().click();
    cy.url().should('include', '/movies');
});

it('should visit movies screen to click peliculas button navbar', () => {
  cy.visit('http://localhost:4200');
  cy.get('a.toolbar__link').eq(1).click();
  cy.url().should('include', '/movies');
});

it('should visit actor screen to click actores button navbar', () => {
  cy.visit('http://localhost:4200');
  cy.get('a.toolbar__link').eq(2).click();
  cy.url().should('include', '/actors');
});

it('should visit studios screen to click estudios button navbar', () => {
  cy.visit('http://localhost:4200');
  cy.get('a.toolbar__link').eq(3).click();
  cy.url().should('include', '/studios');
});
