import { H3 } from "./h3.component";

describe("<H3 />", () => {
  it("renders it's children", () => {
    cy.mount(<H3>Hello World</H3>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
