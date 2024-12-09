import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { BoxGeometry, Mesh } from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { BrandPrimaryColors } from "../../assets/Brand";
import { ThreeSection } from "../../components/ThreeSection";

interface BoxProps {
  props?: ThreeElements["mesh"];
  autoRotate?: boolean;
}

const Box = (props: BoxProps) => {
  const meshRef = useRef<Mesh>(null);

  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    if (props.autoRotate) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props.props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => {
        setActive(!active);
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? BrandPrimaryColors.orange : BrandPrimaryColors.green} />
    </mesh>
  );
};

interface TestModelProps {
  modelPath: string;
}

const TestModel = (props: TestModelProps) => {
  const meshRef = useRef<Mesh>(null);
  const { scene } = useGLTF(props.modelPath);

  const count = useRef(0);

  useFrame(() => {
    if (!meshRef.current) {
      return;
    }
    count.current++;
    if (count.current <= 50) {
      meshRef.current.rotation.x -= 0.125;
      meshRef.current.rotation.y += 0.0625;
    } else if (count.current < 100) {
      meshRef.current.rotation.x += 0.0625;
      meshRef.current.rotation.y -= 0.125;
    } else {
      count.current = 1;
    }
  });
  return (
    <mesh ref={meshRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export const Three = () => {
  return (
    <div style={{ flexDirection: "column", display: "flex", alignItems: "center" }}>
      <ThreeSection />
      <div
        style={{
          border: "1px solid black",
          height: "300px",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          backgroundColor: "white",
        }}
      >
        <Canvas color="black">
          <OrbitControls minDistance={2} maxDistance={15} />
          <ambientLight intensity={5} />
          <directionalLight position={[10, 10, 10]} intensity={3} />
          <Box autoRotate={false} />
        </Canvas>
      </div>
      <div
        style={{
          border: "1px solid black",
          height: "300px",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          backgroundColor: "white",
        }}
      >
        <Canvas>
          <ambientLight />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Box autoRotate={true} />
        </Canvas>
      </div>
      <div
        style={{
          border: "1px solid black",
          height: "300px",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          backgroundColor: "white",
        }}
      >
        <Canvas>
          <OrbitControls minDistance={1} maxDistance={15} />
          <ambientLight intensity={3} />
          <directionalLight position={[10, 10, 10]} intensity={5} />
          <Suspense fallback={null}>
            <TestModel modelPath={"Macbook Pro.glb"} />
          </Suspense>
        </Canvas>
      </div>
      <div
        style={{
          border: "1px solid black",
          height: "300px",
          width: "50%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          backgroundColor: "white",
        }}
      >
        <Canvas>
          <OrbitControls minDistance={1} maxDistance={15} />
          <ambientLight intensity={3} />
          <directionalLight position={[10, 10, 10]} intensity={5} />
          <Suspense fallback={null}>
            <TestModel modelPath={"pokemon/Pikachu.glb"} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};
