import { ThemeToggle } from "./ThemeToggle";

export const FooterBar = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
        height: "100px",
        width: "100px",
      }}
    >
      <ThemeToggle />
    </div>
  );
};
