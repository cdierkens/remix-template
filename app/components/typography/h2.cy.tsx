import { H2 } from "./h2.component";

describe("<H2 />", () => {
  it("renders it's children", () => {
    cy.mount(<H2>Hello World</H2>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
