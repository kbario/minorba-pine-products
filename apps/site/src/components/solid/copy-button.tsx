import { Button, type ButtonProps } from "@minorba/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@minorba/ui/tooltip";
import { createSignal, splitProps, type Component } from "solid-js";

type CopyButtonProps = ButtonProps<"button"> & {
  content: string;
  textToCopy: string;
  onClick?: Function;
};

export const CopyButton: Component<CopyButtonProps> = (props) => {
  const [open, setOpen] = createSignal(false);

  const [local, others] = splitProps(props as CopyButtonProps, ["onClick"]);

  return (
    <Tooltip defaultOpen={false} open={open()}>
      <TooltipTrigger
        as={Button<"button">}
        onClick={() => {
          navigator.clipboard.writeText(props.textToCopy);
          setOpen(true);
          setTimeout(() => {
            setOpen(false);
          }, 2500);
          if (typeof local.onClick === "function") local.onClick();
        }}
        {...others}
      />
      <TooltipContent>{props.content}</TooltipContent>
    </Tooltip>
  );
};
