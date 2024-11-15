import { Link } from "react-router-dom";
import { PLButton } from "../../components/PLButton";
import logo from "../../logo.svg";
import { SegmentedProgressBar } from "../../components/SegmentedProgressBar";

export const HomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Link to={"/projects"}>
          <PLButton style={{ margin: 20 }}>Projects</PLButton>
        </Link>
        <div style={{ width: "500px" }}>
          <SegmentedProgressBar />
        </div>
      </header>
    </div>
  );
};
