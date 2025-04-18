import { cn } from "@minorba/ui/utils/cn";
import { splitProps, type Component, type ComponentProps } from "solid-js";

const CardList: Component<ComponentProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ul
      class={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        local.class,
      )}
      {...others}
    />
  );
};

const CardListItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <li class={cn("flex w-full", local.class)} {...others} />;
};

export { CardList, CardListItem };
