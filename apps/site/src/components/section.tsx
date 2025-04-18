import { cn } from "@minorba/ui/utils/cn";
import { splitProps, type Component, type ComponentProps } from "solid-js";
import { motionSectionClass } from "../constants/ids";

const Section: Component<
  ComponentProps<"div"> & {
    id: string;
    background?: "default" | "secondary" | "tertiary";
    class?: string;
  }
> = (props) => {
  const [local, others] = splitProps(props, ["class", "background", "id"]);
  return (
    <section id={local.id} class={`${motionSectionClass} flex p-4`}>
      <div
        class={cn(
          "rounded-default min-h-(--view) relative flex h-full w-full flex-col items-center justify-center gap-6 p-4",
          {
            "bg-surface-default":
              local.background === "default" || !props.background,
            "bg-surface-secondary": props.background === "secondary",
            "bg-surface-tertiary": props.background === "tertiary",
          },
          local.class,
        )}
        {...others}
      />
    </section>
  );
};

const SectionHeader: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("flex flex-col items-center gap-2", local.class)}
      {...others}
    />
  );
};

const SectionTitle: Component<ComponentProps<"h2">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <h2 class={cn("flex", local.class)} {...others} />;
};

const SectionDescription: Component<ComponentProps<"p">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return <p class={cn("flex", local.class)} {...others} />;
};

export { Section, SectionDescription, SectionHeader, SectionTitle };
