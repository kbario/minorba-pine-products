import { Button } from "@minorba/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@minorba/ui/side-sheet";
import { HiOutlineBars3 } from "solid-icons/hi";
import { type Component, type ComponentProps, For, Show } from "solid-js";
import { FLAGS, isFeatureEnabled } from "../constants/feature-flags";
import { globalHeader } from "../constants/ids";

const HomeButton = () => (
  <Button as={"a"} href="/">
    Minorba Pine Products
  </Button>
);

const links = [
  {
    display: "Home",
    link: "/",
  },
  {
    display: "Products",
    link: "/products",
    flag: FLAGS.Pages.Products,
  },
  {
    display: "Contact",
    link: "/contact",
    flag: FLAGS.Pages.Contact,
  },
  {
    display: "Decision Tree",
    link: "/decision-tree",
    flag: FLAGS.Pages.DecisionTree,
  },
];
const headerLinks = links.slice(1).filter((x) => isFeatureEnabled(x.flag));

export const Header: Component<ComponentProps<"header">> = () => {
  return (
    <header
      id={globalHeader}
      class={
        "sticky top-0 z-10 flex h-fit items-center justify-between p-4 backdrop-blur-lg"
      }
    >
      <div class="bg-container-default rounded-default flex h-16 w-full items-center justify-between px-4 lg:justify-start">
        <Show fallback={<HomeButton />} when={headerLinks.length}>
          <div class="flex-1">
            <HomeButton />
          </div>

          <ul class="hidden gap-1 px-1 sm:flex">
            <For each={headerLinks}>
              {(l) => (
                <li>
                  <Button as={"a"} href={l.link}>
                    {l.display}
                  </Button>
                </li>
              )}
            </For>
          </ul>
          <Show when={headerLinks.length}>
            <Sheet>
              <SheetTrigger size="icon" class="sm:hidden" as={Button<"button">}>
                <HiOutlineBars3 />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <ul class="hidden gap-1 px-1 sm:flex">
                  <For each={headerLinks}>
                    {(l) => (
                      <li>
                        <Button as={"a"} href={l.link}>
                          {l.display}
                        </Button>
                      </li>
                    )}
                  </For>
                </ul>
              </SheetContent>
            </Sheet>
          </Show>
        </Show>
      </div>
    </header>
  );
};
