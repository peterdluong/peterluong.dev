import { Link } from "react-router-dom";
import { PLButton } from "./PLButton";

export const NavBar = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link to={"/"}>
        <PLButton>Home</PLButton>
      </Link>
      <Link to={"/about"}>
        <PLButton>About</PLButton>
      </Link>
      <Link to={"/projects"}>
        <PLButton>Projects</PLButton>
      </Link>
      <Link to={"/resume"}>
        <PLButton>Resune</PLButton>
      </Link>
      <Link to={"/fun"}>
        <PLButton>Fun</PLButton>
      </Link>
      <Link to={"/three"}>
        <PLButton>Three</PLButton>
      </Link>
    </div>
  );
};
