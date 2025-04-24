import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@minorba/ui/breadcrumbs";
import { Button } from "@minorba/ui/button";
import { Card, CardFooter, CardHeader } from "@minorba/ui/card";

import { HiOutlineChevronRight } from "solid-icons/hi";
import { createMemo, For, Show } from "solid-js";
import type { Props } from "./types";

interface DecisionTreeProps extends Props {
  breadcrumbs: string;
}

export function DecisionTree(props: DecisionTreeProps) {
  return (
    <>
      <h2>{props.title}</h2>
      <For each={props.items}>
        {(it) => {
          return (
            <Show
              fallback={
                <Button as="a" href={"href" in it ? it.href : ""}>
                  {"label" in it ? it.label : ""}
                  <HiOutlineChevronRight />
                </Button>
              }
              when={"title" in it && it}
            >
              {(t) => (
                <Card>
                  <CardHeader>{t().title}</CardHeader>
                  <CardFooter>
                    <For each={t().buttons}>
                      {(b) => (
                        <Button as="a" href={b.href}>
                          {b.label}
                          <HiOutlineChevronRight />
                        </Button>
                      )}
                    </For>
                  </CardFooter>
                </Card>
              )}
            </Show>
          );
        }}
      </For>
    </>
  );
}

type BreadProps = {
  data: string;
  class?: string;
};

export const Bread = (props: BreadProps) => {
  const x = createMemo(() => {
    return (
      props.data?.split("/")?.reduce(
        (acc, d, i, arr) => {
          const newlink = !!acc.accumaltedLink
            ? `${acc.accumaltedLink}/${d}`
            : d;
          acc.rest.push(newlink);
          acc.accumaltedLink = newlink;
          return acc;
        },
        {
          accumaltedLink: "",
          rest: [] as string[],
        },
      ).rest ?? []
    );
  });
  return (
    <Breadcrumb class={props.class}>
      <BreadcrumbList>
        <Show when={x().length}>
          <For each={x()}>
            {(it, i) => {
              return (
                <>
                  <Show when={!!i()}>
                    <BreadcrumbSeparator />
                  </Show>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={"/" + it} class="capitalize">
                      <Show when={it !== "decision-tree"} fallback={"Home"}>
                        {it
                          .split("/")
                          [it.split("/").length - 1].split("-")
                          .join(" ")}
                      </Show>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              );
            }}
          </For>
        </Show>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
