import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { buttonVariants } from "../button/button";

const Card: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn(
        "bg-surface-default text-on-surface-default rounded-default shadow-sm",
        local.class,
      )}
      {...others}
    />
  );
};

const CardHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("flex flex-col space-y-1.5 p-6", local.class)} {...others} />
  );
};

const CardTitle: Component<ComponentProps<"h3">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <h3
      class={cn(
        "text-lg font-semibold leading-none tracking-tight",
        local.class,
      )}
      {...others}
    />
  );
};

const CardDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <p class={cn("text-muted-foreground text-sm", local.class)} {...others} />
  );
};

const CardContent: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn("p-6 pt-0", local.class)} {...others} />;
};

const cardFooterVariants = cva("flex items-center gap-2 p-6 pt-0", {
  variants: {
    direction: {
      right: "flex-row-reverse",
      left: "flex-row",
      up: "flex-col-reverse",
      down: "flex-col",
    },
  },
  defaultVariants: {
    direction: "right",
  },
});

type CardFooterProps<T extends ValidComponent = "div"> = VariantProps<
  typeof cardFooterVariants
> &
  ComponentProps<T>;

const CardFooter: Component<CardFooterProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "direction"]);
  return (
    <div
      class={cn(
        cardFooterVariants({ direction: local.direction }),

        local.class,
      )}
      {...others}
    />
  );
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
