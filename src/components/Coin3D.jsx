import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function useConfiguredTextures(frontPath, backPath) {
  const frontTexture = useLoader(THREE.TextureLoader, frontPath);
  const backTexture = useLoader(THREE.TextureLoader, backPath);

  useEffect(() => {
    [frontTexture, backTexture].forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 16;
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.needsUpdate = true;
    });
  }, [frontTexture, backTexture]);

  return { frontTexture, backTexture };
}


/* =========================================================
   MODEL KOIN 3D
========================================================= */

function CoinModel({ money }) {

  const { frontTexture, backTexture } = useConfiguredTextures(
    money?.front || "/textures/koin1000-depan.jpg",
    money?.back || "/textures/koin1000-belakang.jpg"
  );


  return (
    <group
      rotation={[0, money?.side === "Belakang" ? Math.PI : 0, 0]}
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
  const { frontTexture, backTexture } = useConfiguredTextures(
    money?.front || "/images/uang-1000.png",
    money?.back || "/images/1000-belakang.jpg"
  );

  if (!money) return null;

  const image = frontTexture.image;
  const aspectRatio = image?.width && image?.height
    ? image.width / image.height
    : 2;
  const width = 4.8;
  const height = width / aspectRatio;

  return (
    <group
      rotation={[0, money.side === "Belakang" ? Math.PI : 0, 0]}
      scale={[1.28, 1.28, 1.28]}
    >

      <mesh
        castShadow
        receiveShadow
      >

        <boxGeometry
          args={[
            width,
            height,
            0.012
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
          color="#ffffff"
          roughness={0.74}
          metalness={0}
        />


        {/* =================================================
            BELAKANG
        ================================================= */}

        <meshStandardMaterial
          attach="material-5"
          map={backTexture}
          color="#ffffff"
          roughness={0.74}
          metalness={0}
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

          <BanknoteModel
            money={{
              front: "/images/uang-1000.png",
              back: "/images/1000-belakang.jpg"
            }}
          />

        )}


        {/* =================================================
            CONTROL
        ================================================= */}

        <OrbitControls

          enablePan={true}

          enableZoom={true}

          minDistance={2.2}

          maxDistance={9}

          minPolarAngle={0.15}

          maxPolarAngle={Math.PI - 0.15}

          minAzimuthAngle={-Math.PI}

          maxAzimuthAngle={Math.PI}

          rotateSpeed={0.65}

          zoomSpeed={1}

          panSpeed={0.7}

          enableDamping={true}

          dampingFactor={0.06}

        />

      </Canvas>

    </div>
  );
}