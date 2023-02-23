import { H1 } from "./h1";

describe("<H1 />", () => {
  it("renders", () => {
    cy.mount(<H1>Hello World</H1>);
  });
});
