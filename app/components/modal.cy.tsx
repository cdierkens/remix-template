import type { PropsWithChildren } from "react";
import type { OverlayTriggerProps } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import type { ModalProps } from "./modal.component";
import { Modal } from "./modal.component";

type TestComponentProps = Omit<ModalProps, "state"> &
  Partial<OverlayTriggerProps>;

function TestComponent({
  children,
  ...props
}: PropsWithChildren<TestComponentProps>) {
  const state = useOverlayTriggerState({ defaultOpen: true, ...props });

  return (
    <Modal {...props} state={state}>
      {children}
    </Modal>
  );
}

describe("<Modal />", () => {
  it("renders", () => {
    cy.mount(<TestComponent title="Hello World">Foo Bar</TestComponent>);

    cy.findByRole("dialog", { name: "Hello World" }).contains("Foo Bar");
  });
});
