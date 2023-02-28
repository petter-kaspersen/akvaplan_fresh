import { Head } from "$fresh/runtime.ts";

const button = Deno.readTextFile(`./components/button/button.css`);
const cssfiles = ["reset", "fonts", "openprops", "root", "dark", "light"]
  .map((
    f,
  ) => Deno.readTextFile(`./static/css/${f}.css`));
export const defaultStyles = await Promise.all([...cssfiles, button]);

export const Styles = ({ styles = defaultStyles } = {}) => (
  <style dangerouslySetInnerHTML={{ __html: styles.join("\n") }} />
);
