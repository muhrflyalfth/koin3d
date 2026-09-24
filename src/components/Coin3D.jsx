import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";


/* =========================================================
   MODEL KOIN 3D
========================================================= */

function CoinModel({ money }) {

  const frontTexture = useLoader(
    THREE.TextureLoader,
    money?.front || "/textures/koin1000-depan.jpg"
  );

  const backTexture = useLoader(
    THREE.TextureLoader,
    money?.back || "/textures/koin1000-belakang.jpg"
  );


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
      scale={[
        0.82,
        0.82,
        0.82
      ]}
    >

      <mesh
        castShadow
        receiveShadow
      >

        <cylinderGeometry
          args={[
            2.4,
            2.4,
            0.32,
            128,
            1
          ]}
        />

        {/* TEPI KOIN */}
        <meshStandardMaterial
          attach="material-0"
          color="#bfc3c5"
          metalness={0.96}
          roughness={0.22}
        />

        {/* DEPAN */}
        <meshStandardMaterial
          attach="material-1"
          map={frontTexture}
          metalness={0.72}
          roughness={0.32}
        />

        {/* BELAKANG */}
        <meshStandardMaterial
          attach="material-2"
          map={backTexture}
          metalness={0.72}
          roughness={0.32}
        />

      </mesh>

    </group>
  );
}


/* =========================================================
   MODEL UANG KERTAS 3D
========================================================= */

function BanknoteModel({ money }) {

  if (!money) return null;


  const frontTexture = useLoader(
    THREE.TextureLoader,
    money.front
  );

  const backTexture = useLoader(
    THREE.TextureLoader,
    money.back
  );


  frontTexture.colorSpace = THREE.SRGBColorSpace;
  backTexture.colorSpace = THREE.SRGBColorSpace;

  frontTexture.anisotropy = 16;
  backTexture.anisotropy = 16;

  frontTexture.wrapS = THREE.ClampToEdgeWrapping;
  frontTexture.wrapT = THREE.ClampToEdgeWrapping;

  backTexture.wrapS = THREE.ClampToEdgeWrapping;
  backTexture.wrapT = THREE.ClampToEdgeWrapping;


  return (
    <group>
      rotation={[0, 0, 0]}
      scale={[1.05, 1.05, 1.05]}

      <mesh
        castShadow
        receiveShadow
      >

        <boxGeometry
          args={[
            4.8,
            2.4,
            0.10
          ]}
        />


        {/* =================================================
            SISI
        ================================================= */}

        <meshStandardMaterial
          attach="material-0"
          color="#d7d7d7"
          roughness={0.65}
          metalness={0}
        />

        <meshStandardMaterial
          attach="material-1"
          color="#d7d7d7"
          roughness={0.65}
          metalness={0}
        />

        <meshStandardMaterial
          attach="material-2"
          color="#d7d7d7"
          roughness={0.65}
          metalness={0}
        />

        <meshStandardMaterial
          attach="material-3"
          color="#d7d7d7"
          roughness={0.65}
          metalness={0}
        />


        {/* =================================================
            DEPAN
        ================================================= */}

        <meshStandardMaterial
          attach="material-4"
          map={frontTexture}
          color="#d0d0d0"
        />


        {/* =================================================
            BELAKANG
        ================================================= */}

        <meshStandardMaterial
          attach="material-5"
          map={backTexture}
          color="#d0d0d0"
        />

      </mesh>

    </group>
  );
}


/* =========================================================
   COIN 3D
========================================================= */

export default function Coin3D({
  money = null
}) {

  return (
    <div className="coin-3d-container">

      <Canvas

        shadows

        dpr={[
          1,
          2
        ]}

        camera={{
          position: [
            0,
            0,
            6.8
          ],

          fov: 40
        }}

        gl={{
          antialias: true,
          alpha: true
        }}
      >

        {/* =================================================
            LIGHTING
        ================================================= */}

        <ambientLight
          intensity={2.1}
        />

        <directionalLight
          position={[
            5,
            6,
            7
          ]}
          intensity={4}
          castShadow
        />

        <directionalLight
          position={[
            -5,
            2,
            5
          ]}
          intensity={2.2}
        />

        <pointLight
          position={[
            0,
            2,
            6
          ]}
          intensity={1.5}
        />

        <directionalLight
          position={[
            0,
            -3,
            -5
          ]}
          intensity={1.2}
        />


        {/* =================================================
            MODEL DINAMIS
        ================================================= */}

        {money?.type === "coin" ? (

          <CoinModel
            money={money}
          />

        ) : money?.type === "banknote" ? (

          <BanknoteModel
            money={money}
          />

        ) : (

          <CoinModel
            money={{
              front: "/textures/koin1000-depan.jpg",
              back: "/textures/koin1000-belakang.jpg"
            }}
          />

        )}


        {/* =================================================
            CONTROL
        ================================================= */}

        <OrbitControls

          enablePan={false}

          enableZoom={true}

          minDistance={3.5}

          maxDistance={9}

          rotateSpeed={0.65}

          zoomSpeed={0.8}

          enableDamping={true}

          dampingFactor={0.06}

        />

      </Canvas>

    </div>
  );
}