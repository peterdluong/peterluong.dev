import { useEffect, useRef, useState } from "react";
import "./CanvasBackground.css";

interface CanvasBackgroundProps {}

interface circleProps {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
}

export const CanvasBackground = (props: CanvasBackgroundProps) => {
  const [theme, setTheme] = useState("light");
  const [resolution, set] = useState(2);
  const [circleColor, setCircleColor] = useState("235, 245, 251");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationRef = useRef<number | null>(null);

  // useEffect(() => {
  //   if (!canvasRef.current) return;

  //   let mainContext = canvasRef.current.getContext("2d");
  //   let circlesArray = new Array();

  //   const animate = () => {
  //     animationRef.current = requestAnimationFrame(animate);
  //   };
  //   animationRef.current = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(animationRef.current!);
  // }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    // canvasRef.current.height = canvasRef.current.height * 2;
    // canvasRef.current.width = canvasRef.current.width * 2;

    const canvas = canvasRef.current;

    const circles: circleProps[] = [];
    const canvasArea = canvas.height * canvas.width;
    const numCirclesMin = canvasArea / 10000;
    const numCirclesMax = canvasArea / 9000;
    const numCircles = (Math.random() * (numCirclesMax - numCirclesMin) + numCirclesMin) / Math.pow(resolution, 2);

    for (let i = 0; i < numCircles; i++) {
      let randomColor: string;
      switch (Math.floor(Math.random() * (3 - 0 + 1) + 0)) {
        case 0:
          randomColor = "235, 245, 251";
          break;
        case 1:
          randomColor = "80,200,120";
          break;
        case 2:
          randomColor = "251,154,84";
          break;
        case 3:
          randomColor = "0,197,255";
          break;
        default:
          randomColor = "235, 245, 251";
          break;
      }
      circles.push({
        x: Math.round(-100 + Math.random() * canvas.width),
        y: Math.round(-100 + Math.random() * canvas.height),
        radius: (Math.random() * (40 - 1) + 1) * resolution,
        dx: (Math.random() - 0.5) * 0.15 * resolution,
        dy: (Math.random() - 0.5) * 0.15 * resolution,
        color: `rgba(${randomColor}, ${
          Math.random() * (theme == "dark" ? 0.25 : 0.25) + (theme == "dark" ? 0.02 : 0.25)
        })`,
      });
    }

    const animate = () => {
      const context = canvas.getContext("2d")!;
      context.canvas.width = window.innerWidth * resolution;
      context.canvas.height = window.innerHeight * resolution;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const circle of circles) {
        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = circle.color;
        context.fill();

        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
          circle.dx = -circle.dx;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
          circle.dy = -circle.dy;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  return (
    <div id="circles-js" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
      <canvas
        id="canvasBackground"
        ref={canvasRef}
        width={window.screen.availWidth * resolution}
        height={window.screen.availHeight * resolution}
        style={{ width: "100%", height: "100%", backgroundColor: theme === "dark" ? "#1A1A1A" : "#E0E0E0" }}
      ></canvas>
    </div>
  );
};
