import { H5 } from "./h5.component";

describe("<H5 />", () => {
  it("renders it's children", () => {
    cy.mount(<H5>Hello World</H5>);

    cy.findByRole("heading", { name: "Hello World" }).should("be.visible");
  });
});
