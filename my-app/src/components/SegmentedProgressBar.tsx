import { CSSProperties, ReactNode } from "react";
import "./SegmentedProgressBar.css";

type SegmentedProgressBarProps = {
  style?: CSSProperties;
  children?: ReactNode;
  onClickAction?: Function;
};

export const SegmentedProgressBar = (props: SegmentedProgressBarProps) => {
  return (
    <div className="progress-bar-striped">
      <div style={{ width: "100%" }}>
        <b>
          <p>100%</p>
        </b>
      </div>
    </div>
  );
};
