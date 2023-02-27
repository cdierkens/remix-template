import { H1 } from "./h1.component";

describe("<H1 />", () => {
  it("renders", () => {
    cy.mount(<H1>Hello World</H1>);
  });
});
