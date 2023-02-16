//https://github.com/denoland/fresh/issues/371#issuecomment-1172915981

//
export function Header() {
  return (
    <header
      style={{
        minHeight: "64px",
        background: "black",
        margin: 0,
        padding: "4px",
        color: "white",
        display: "grid",
        placeItems: "center",
      }}
    >
      <a href="/">
        <img src="/akvaplan_logo.svg" width="180" alt="logo" />
      </a>
    </header>
  );
}
