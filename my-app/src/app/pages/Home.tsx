import { Link } from "react-router-dom";
import { PLButton } from "../../components/PLButton";
import logo from "../../logo.svg";
import { SegmentedProgressBar } from "../../components/SegmentedProgressBar";
import { useEffect, useRef, useState } from "react";

export const HomePage = () => {
  const [segments, setSegments] = useState(-1);
  const maxSegments = useRef(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegments((prevState) => prevState + 1);
      if (segments >= maxSegments.current) {
        setSegments(-1);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [segments]);

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
          <SegmentedProgressBar numSegments={maxSegments.current} currentSegment={segments} />
        </div>
      </header>
    </div>
  );
};
