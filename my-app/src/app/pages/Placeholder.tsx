import { useSelector } from "react-redux";
import logo from "../../logo.svg";
import { RootState } from "../../redux/store";

export const Placeholder = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="textTransition" style={{ color: theme === "light" ? "#1A1A1A" : "#E0E0E0" }}>
          <code>This site is currently in development. Check back soon!</code>
        </p>
      </header>
    </div>
  );
};
