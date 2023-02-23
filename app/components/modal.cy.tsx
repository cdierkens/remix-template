import { Modal } from "./modal";

describe("<Modal />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Modal
        state={{
          open() {
            return;
          },
          close() {
            return;
          },
          isOpen: true,
          setOpen() {
            return;
          },
          toggle() {
            return;
          },
        }}
      >
        Hello World
      </Modal>
    );

    cy.findByRole("dialog").contains("Hello World");
  });
});
