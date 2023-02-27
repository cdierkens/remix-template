import type { PropsWithChildren } from "react";
import React from "react";
import type { AriaDialogProps } from "react-aria";
import { useDialog } from "react-aria";
import { H3 } from "./typography/h3.component";

interface ModalProps extends AriaDialogProps {
  title: string;
}

export function Dialog({
  title,
  children,
  ...props
}: PropsWithChildren<ModalProps>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref}>
      <H3 {...titleProps}>{title}</H3>

      {children}
    </div>
  );
}
