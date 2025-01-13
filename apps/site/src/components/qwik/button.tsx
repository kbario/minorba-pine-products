/** @jsxImportSource @builder.io/qwik */

import { component$, useSignal, type PropsOf } from "@builder.io/qwik";

type ButtonProps = PropsOf<'button'> & { textToCopy: string }

export const CopyButton = component$<ButtonProps>(({ textToCopy, ...props }) => {
        const shouldAddClass = useSignal(false)
        return (
                <button {...props} onClick$={() => {
                        navigator.clipboard.writeText(textToCopy);
                        shouldAddClass.value = true;
                        setTimeout(() => {
                                shouldAddClass.value = false
                        }, 2500)
                }} class={["btn-ghost btn", { "tooltip": shouldAddClass.value }]} data-tip='copied'>
                        {textToCopy}
                </button>
        );
});
