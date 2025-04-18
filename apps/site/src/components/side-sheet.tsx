import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@minorba/ui/side-sheet";
import { Button } from "@minorba/ui/button";
import type { ParentComponent } from "solid-js";
import { HiOutlineBars3 } from "solid-icons/hi";

export const SideSheet: ParentComponent<{
  triggerClass: string;
  title: string;
}> = (props) => (
  <Sheet>
    <SheetTrigger size="icon" class={props.triggerClass} as={Button<"button">}>
      <HiOutlineBars3 />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{props.title}</SheetTitle>
        {/* <SheetDescription>adsf</SheetDescription> */}
      </SheetHeader>
      {props.children}
      {/* <SheetFooter>zxcv</SheetFooter> */}
    </SheetContent>
  </Sheet>
);
