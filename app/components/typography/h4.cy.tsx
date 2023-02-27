import { H4 } from "./h4.component";

describe("<H4 />", () => {
  it("renders it's children", () => {
    cy.mount(<H4>Hello World</H4>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
