import { CSSProperties, ReactNode } from "react";
import "./styles/SegmentedProgressBar.css";

type SegmentedProgressBarProps = {
  style?: CSSProperties;
  children?: ReactNode;
  numSegments?: number;
  currentSegment?: number;
  animated?: boolean;
};

export const SegmentedProgressBar = (props: SegmentedProgressBarProps) => {
  const { numSegments = 3, currentSegment = 1, animated = false } = props;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {Array.from({ length: numSegments }).map((_, index) => {
        const leftBorderRadius = index === 0 ? "10px" : "0px";
        const rightBorderRadius = index === numSegments - 1 ? "10px" : "0px";
        if (index < currentSegment) {
          return (
            <div
              style={{
                backgroundColor: "#de0000",
                width: "100%",
                height: 20,
                borderRadius: `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`,
                margin: "0px 1px",
              }}
            ></div>
          );
        } else if (index > currentSegment) {
          return (
            <div
              style={{
                backgroundColor: "white",
                width: "100%",
                height: 20,
                borderRadius: `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`,
                margin: "0px 1px",
              }}
            ></div>
          );
        } else {
          return (
            <div
              className="progress-bar-striped"
              style={{
                width: "100%",
                margin: "0px 1px",
                borderRadius: `${leftBorderRadius} ${rightBorderRadius} ${rightBorderRadius} ${leftBorderRadius}`,
              }}
            >
              <div style={{ width: "100%" }}></div>
            </div>
          );
        }
      })}
    </div>

    // <div style={{ padding: "25px", backgroundColor: "white", borderRadius: "4px" }}>
    //   <div className="progress-bar-striped">
    //     <div style={{ width: "100%" }}>
    //       <b>
    //         <p>100%</p>
    //       </b>
    //     </div>
    //   </div>
    // </div>
  );
};
