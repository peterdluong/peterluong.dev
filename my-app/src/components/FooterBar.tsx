import { ThemeToggle } from "./ThemeToggle";

export const FooterBar = () => {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 0,
      }}
    >
      <ThemeToggle />
    </div>
  );
};
