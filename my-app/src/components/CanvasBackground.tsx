import { useEffect, useRef } from "react";
import "./styles/CanvasBackground.css";
import { getRandomInt, getRandomNum } from "../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CanvasBackgroundProps {}

interface circleProps {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
  opacity: number;
}

const RESOLUTION = 2;
const MAX_SPEED = 2 * RESOLUTION;
const MIN_SPEED = 0.15 * RESOLUTION;
const ATTRACTION_STRENGTH = 0.005 * RESOLUTION;
const FRICTION = 0.999;

export const CanvasBackground = (props: CanvasBackgroundProps) => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<circleProps[]>([]);
  let animationRef = useRef<number | null>(null);

  let mouseX = 0; // Mouse x position
  let mouseY = 0; // Mouse y position
  let isMouseOnScreen = false; // Track if the mouse is on the screen

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const canvasArea = canvas.height * canvas.width;

    const numCirclesMin = canvasArea / 11000;
    const numCirclesMax = canvasArea / 10000;
    const numCircles = getRandomInt(numCirclesMin, numCirclesMax) / RESOLUTION ** 2;

    // const circles: circleProps[] = [];
    circlesRef.current = [];

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
      circlesRef.current.push({
        x: getRandomInt(50, canvas.width - 50),
        y: getRandomInt(50, canvas.height - 50),
        radius: getRandomNum(1, 40) * RESOLUTION,
        dx: (Math.random() - 0.5) * 0.15 * RESOLUTION,
        dy: (Math.random() - 0.5) * 0.15 * RESOLUTION,
        color: randomColor, // `rgba(${randomColor}, ${theme === "dark" ? getRandomNum(0.02, 0.2) : getRandomNum(0.25, 0.5)})`,
        opacity: theme === "dark" ? getRandomNum(0.02, 0.2) : getRandomNum(0.27, 0.45),
      });
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) * RESOLUTION;
      mouseY = (event.clientY - rect.top) * RESOLUTION;
      isMouseOnScreen = true;
    };

    const handleMouseLeave = () => {
      isMouseOnScreen = false; // Mouse is no longer on the screen
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseLeave);

    const animate = () => {
      const context = canvas.getContext("2d")!;
      context.canvas.width = window.innerWidth * RESOLUTION;
      context.canvas.height = window.innerHeight * RESOLUTION;

      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const circle of circlesRef.current) {
        if (isMouseOnScreen) {
          // Attraction effect based on mouse position
          const distX = mouseX - circle.x;
          const distY = mouseY - circle.y;
          const distance = Math.sqrt(distX ** 2 + distY ** 2);

          if (distance < 100 * RESOLUTION) {
            circle.dx += (distX / distance) * ATTRACTION_STRENGTH;
            circle.dy += (distY / distance) * ATTRACTION_STRENGTH;
          }
        }

        // Apply FRICTION to slow down the circles gradually
        circle.dx *= FRICTION;
        circle.dy *= FRICTION;

        // Ensure the speed doesn't drop below the minimum speed
        const speed = Math.sqrt(circle.dx ** 2 + circle.dy ** 2);
        if (speed < MIN_SPEED) {
          const angle = Math.atan2(circle.dy, circle.dx);
          circle.dx = Math.cos(angle) * MIN_SPEED;
          circle.dy = Math.sin(angle) * MIN_SPEED;
        }

        // Cap the speed to the maximum speed
        if (speed > MAX_SPEED) {
          circle.dx = (circle.dx / speed) * MAX_SPEED;
          circle.dy = (circle.dy / speed) * MAX_SPEED;
        }

        context.beginPath();
        context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(${circle.color}, ${circle.opacity})`;
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
      document.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  useEffect(() => {
    circlesRef.current.forEach((circle) => {
      if (theme === "light") {
        if (circle.opacity < 0.25) {
          setTimeout(() => {
            circle.opacity += 0.25;
          }, 250);
        }
      } else if (theme === "dark") {
        if (circle.opacity > 0.25) {
          circle.opacity -= 0.25;
        }
      }
    });
  }, [theme]);

  return (
    <div id="circles-js" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
      <canvas
        id="canvasBackground"
        ref={canvasRef}
        width={window.screen.availWidth * RESOLUTION}
        height={window.screen.availHeight * RESOLUTION}
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme === "dark" ? "#1A1A1A" : "#E0E0E0",
        }}
      ></canvas>
    </div>
  );
};
