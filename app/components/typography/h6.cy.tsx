import { H6 } from "./h6.component";

describe("<H6 />", () => {
  it("renders it's children", () => {
    cy.mount(<H6>Hello World</H6>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
