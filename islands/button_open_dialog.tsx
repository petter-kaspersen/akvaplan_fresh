import { t } from "akvaplan_fresh/text/mod.ts";
import { Icon } from "akvaplan_fresh/components/mod.ts";
import { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

const handleClick = (e: MouseEvent) => {
  const query = e?.target?.dataset?.for ?? "dialog";
  const dialog = e.target?.ownerDocument?.querySelector(query);
  if (dialog) {
    const { open } = dialog;
    if (open) {
      //
    } else {
      dialog.showModal();
    }
  }
};

export default (
  { children, ...props }: JSX.HTMLAttributes<HTMLElement>,
) => (
  <button aria-label={props.label} onClick={handleClick} {...props}>
    {children}
  </button>
);
