import type { OverlayTriggerState } from "@react-stately/overlays";
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import React, { useId } from "react";
import type { AriaModalOverlayProps } from "react-aria";
import { FocusScope, Overlay, useModalOverlay } from "react-aria";

interface ModalProps extends AriaModalOverlayProps {
  state: OverlayTriggerState;
}

export function Modal({
  state,
  children,
  ...props
}: PropsWithChildren<ModalProps>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const id = useId();

  return (
    <Overlay>
      <FocusScope contain restoreFocus autoFocus>
        <input
          type="checkbox"
          checked={state.isOpen}
          id={id}
          tabIndex={-1}
          className="modal-toggle"
          onChange={() => undefined}
        />
        <div
          className={clsx("modal", {
            "model-open": state.isOpen,
          })}
          {...underlayProps}
        >
          <div role="dialog" {...modalProps} ref={ref} className="modal-box">
            {children}
          </div>
        </div>
      </FocusScope>
    </Overlay>
  );
}
