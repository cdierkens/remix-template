describe("authentication", () => {
  it("should sign in", () => {
    cy.signIn({
      email: Cypress.env("VIEWER_EMAIL"),
      password: Cypress.env("VIEWER_PASSWORD"),
    });

    cy.visit("/");

    cy.findByRole("link", { name: Cypress.env("VIEWER_EMAIL") });
  });
});
