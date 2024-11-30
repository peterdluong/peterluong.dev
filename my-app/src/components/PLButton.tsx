import { CSSProperties, ReactNode } from "react";
import "./styles/PLButton.css";

type PLButtonProps = {
  style?: CSSProperties;
  children?: ReactNode;
  onClickAction?: Function;
};

export const PLButton = (props: PLButtonProps) => {
  const { onClickAction = () => {} } = props;
  return (
    <button className="PLButton" style={props.style} onClick={props.onClickAction && (() => onClickAction())}>
      {props.children}
    </button>
  );
};
