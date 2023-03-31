import { Head } from "$fresh/runtime.ts";

const button = Deno.readTextFile(`./components/button/button.css`);
const hscroll = Deno.readTextFile(`./components/album/halbum.css`);

const cssfiles = [
  "reset",
  "fonts",
  "openprops",
  "root",
  "dark",
  "light",
  "icons",
]
  .map((
    f,
  ) => Deno.readTextFile(`./static/css/${f}.css`));
export const defaultStyles = await Promise.all([...cssfiles, button, hscroll]);

export const Styles = ({ styles = defaultStyles } = {}) => (
  <style dangerouslySetInnerHTML={{ __html: styles.join("\n") }} />
);
