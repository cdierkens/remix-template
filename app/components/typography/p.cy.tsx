import { P } from "./p.component";

describe("<P />", () => {
  it("renders it's children", () => {
    cy.mount(<P>Hello World</P>);

    cy.findByText("Hello World").should("be.visible");
  });
});
