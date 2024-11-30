import { useEffect, useRef, useState } from "react";
import "./styles/CanvasBackground.css";
import { getRandomInt, getRandomNum } from "../utils/utils";

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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  let animationRef = useRef<number | null>(null);

  let mouseX = 0; // Mouse x position
  let mouseY = 0; // Mouse y position

  const MAX_SPEED = 1.5; // Maximum speed of circles
  const resolution = 2;

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const circles: circleProps[] = [];
    const canvasArea = canvas.height * canvas.width;
    const numCirclesMin = canvasArea / 11000;
    const numCirclesMax = canvasArea / 10000;
    const numCircles = getRandomInt(numCirclesMin, numCirclesMax) / resolution ** 2;

    for (let i = 0; i < numCircles; i++) {
      let randomColor: string;
      switch (getRandomInt(0, 3)) {
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
        x: getRandomInt(-100, canvas.width + 100),
        y: getRandomInt(-100, canvas.height + 100),
        radius: getRandomNum(1, 40) * resolution,
        dx: (Math.random() - 0.5) * 0.15 * resolution,
        dy: (Math.random() - 0.5) * 0.15 * resolution,
        color: `rgba(${randomColor}, ${theme === "dark" ? getRandomNum(0.02, 0.2) : getRandomNum(0.25, 0.5)})`,
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) * resolution;
      mouseY = (event.clientY - rect.top) * resolution;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const context = canvas.getContext("2d")!;
      context.canvas.width = window.innerWidth * resolution;
      context.canvas.height = window.innerHeight * resolution;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const circle of circles) {
        // Attraction effect based on mouse position
        const distX = mouseX - circle.x;
        const distY = mouseY - circle.y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        if (distance < 100 * resolution) {
          const attractionStrength = 0.01; // Attraction effect multiplier
          circle.dx += (distX / distance) * attractionStrength;
          circle.dy += (distY / distance) * attractionStrength;
        }

        // Cap the speed of the circle
        const speed = Math.sqrt(circle.dx ** 2 + circle.dy ** 2);
        if (speed > MAX_SPEED) {
          circle.dx = (circle.dx / speed) * MAX_SPEED;
          circle.dy = (circle.dy / speed) * MAX_SPEED;
        }

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

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationRef.current!);
    };
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
