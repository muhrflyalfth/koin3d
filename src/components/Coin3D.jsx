import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";


/* =========================================================
   MODEL KOIN
========================================================= */

function CoinModel({ side }) {

  const frontTexture = useLoader(
    THREE.TextureLoader,
    "/textures/koin1000-depan.jpg"
  );

  const backTexture = useLoader(
    THREE.TextureLoader,
    "/textures/koin1000-belakang.jpg"
  );


  /* =========================================================
     TEXTURE
  ========================================================= */

  frontTexture.colorSpace =
    THREE.SRGBColorSpace;

  backTexture.colorSpace =
    THREE.SRGBColorSpace;

  frontTexture.anisotropy = 16;
  backTexture.anisotropy = 16;

  frontTexture.wrapS =
    THREE.ClampToEdgeWrapping;

  frontTexture.wrapT =
    THREE.ClampToEdgeWrapping;

  backTexture.wrapS =
    THREE.ClampToEdgeWrapping;

  backTexture.wrapT =
    THREE.ClampToEdgeWrapping;


  return (

    <group

      /*
       * KOIN DIBUAT TEGAK
       *
       * Sumbu Y = atas / bawah
       * Sumbu Z = menghadap kamera
       *
       * Tidak menggunakan Math.PI / 2
       * agar koin tidak miring.
       */

      rotation={[
        0,
        side === "back"
          ? Math.PI
          : 0,
        0
      ]}

      scale={[
        0.82,
        0.82,
        0.82
      ]}

    >


      {/* =====================================================
          BADAN KOIN
      ===================================================== */}

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


        {/* =================================================
            SISI / TEPI KOIN
        ================================================= */}

        <meshStandardMaterial
          attach="material-0"
          color="#bfc3c5"
          metalness={0.96}
          roughness={0.22}
        />


        {/* =================================================
            DEPAN KOIN
        ================================================= */}

        <meshStandardMaterial
          attach="material-1"
          map={frontTexture}
          metalness={0.72}
          roughness={0.32}
        />


        {/* =================================================
            BELAKANG KOIN
        ================================================= */}

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
   COIN 3D
========================================================= */

export default function Coin3D({
  side = "front"
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
            KOIN
        ================================================= */}

        <CoinModel
          side={side}
        />


        {/* =================================================
            CONTROL
        ================================================= */}

        <OrbitControls

          /*
           * Tidak bisa geser posisi koin
           */
          enablePan={false}


          /*
           * Zoom tetap aktif
           */
          enableZoom={true}


          minDistance={3.5}

          maxDistance={9}


          /*
           * Kecepatan putar
           */
          rotateSpeed={0.65}


          /*
           * Kecepatan zoom
           */
          zoomSpeed={0.8}


          /*
           * Gerakan lebih halus
           */
          enableDamping={true}

          dampingFactor={0.06}

        />

      </Canvas>

    </div>

  );
}