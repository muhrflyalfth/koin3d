import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function CoinModel() {
  const frontTexture = useLoader(
    THREE.TextureLoader,
    "/textures/koin1000-depan.jpg"
  );

  const backTexture = useLoader(
    THREE.TextureLoader,
    "/textures/koin1000-belakang.jpg"
  );

  // ==============================
  // KUALITAS TEKSTUR
  // ==============================

  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;

  frontTexture.anisotropy = 16;
  backTexture.anisotropy = 16;

  frontTexture.wrapS = THREE.ClampToEdgeWrapping;
  frontTexture.wrapT = THREE.ClampToEdgeWrapping;

  backTexture.wrapS = THREE.ClampToEdgeWrapping;
  backTexture.wrapT = THREE.ClampToEdgeWrapping;

  return (
    <group
      rotation={[Math.PI / 2, 0, 0]}
      scale={[0.6, 0.6, 0.6]}
    >

      {/* ==============================
          BADAN KOIN
      ============================== */}

      <mesh castShadow receiveShadow>

        <cylinderGeometry
          args={[
            2.4,
            2.4,
            0.32,
            128,
            1
          ]}
        />

        {/* SAMPING */}
        <meshStandardMaterial
          attach="material-0"
          color="#bfc3c5"
          metalness={0.95}
          roughness={0.24}
        />

        {/* DEPAN */}
        <meshStandardMaterial
          attach="material-1"
          map={frontTexture}
          metalness={0.75}
          roughness={0.34}
        />

        {/* BELAKANG */}
        <meshStandardMaterial
          attach="material-2"
          map={backTexture}
          metalness={0.75}
          roughness={0.34}
        />

      </mesh>


      {/* ==============================
          RING DEPAN
      ============================== */}

      <mesh position={[0, 0, 0.17]}>

        <torusGeometry
          args={[
            2.18,
            0.055,
            16,
            128
          ]}
        />

        <meshStandardMaterial
          color="#d7d9da"
          metalness={1}
          roughness={0.18}
        />

      </mesh>


      {/* ==============================
          RING BELAKANG
      ============================== */}

      <mesh position={[0, 0, -0.17]}>

        <torusGeometry
          args={[
            2.18,
            0.055,
            16,
            128
          ]}
        />

        <meshStandardMaterial
          color="#9fa4a7"
          metalness={1}
          roughness={0.2}
        />

      </mesh>

    </group>
  );
}


/* =====================================
   COIN 3D
===================================== */

export default function Coin3D() {

  return (

    <div
      style={{
        width: "220px",
        height: "220px",
        margin: "0 auto",
        borderRadius: "50%",
        overflow: "hidden",
        background: "#063b66",
      }}
    >

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{
          position: [0, 0, 6.8],
          fov: 40,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >

        {/* ==============================
            AMBIENT
        ============================== */}

        <ambientLight intensity={2.2} />


        {/* ==============================
            CAHAYA UTAMA
        ============================== */}

        <directionalLight
          position={[5, 6, 7]}
          intensity={4}
          castShadow
        />


        {/* ==============================
            CAHAYA KIRI
        ============================== */}

        <directionalLight
          position={[-5, 2, 5]}
          intensity={2.2}
        />


        {/* ==============================
            CAHAYA DEPAN
        ============================== */}

        <pointLight
          position={[0, 2, 6]}
          intensity={1.5}
        />


        {/* ==============================
            CAHAYA BELAKANG
        ============================== */}

        <directionalLight
          position={[0, -3, -5]}
          intensity={1.2}
        />


        {/* ==============================
            KOIN
        ============================== */}

        <CoinModel />


        {/* ==============================
            INTERAKSI
        ============================== */}

        <OrbitControls
          enablePan={false}
          enableZoom={true}

          minDistance={3.8}
          maxDistance={9}

          rotateSpeed={0.65}
          zoomSpeed={0.8}

          enableDamping
          dampingFactor={0.06}
        />

      </Canvas>

    </div>

  );
}