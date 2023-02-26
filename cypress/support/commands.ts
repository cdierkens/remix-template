/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

interface SignInOptions {
  email: string;
  password: string;
}

Cypress.Commands.add("signIn", ({ email, password }: SignInOptions) => {
  cy.session([email, password], () => {
    cy.visit("/sign-in");

    cy.findByLabelText("Email").type(email);
    cy.findByLabelText("Password").type(password);
    cy.findByRole("button", { name: "Sign In" }).click();

    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      signIn(options: SignInOptions): Chainable<void>;
    }
  }
}
