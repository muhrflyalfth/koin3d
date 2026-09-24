import { useEffect, useRef, useState } from "react";
import Coin3D from "./components/Coin3D";
import "./App.css";

// Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const moneyData = [
  // =========================
  // Rp1.000 KOIN
  // =========================
  {
    id: "coin-1000",
    image: "/images/koin-1000.jpg",
    front: "/textures/koin1000-depan.jpg",
    back: "/textures/koin1000-belakang.jpg",
    title: "Rp1.000",
    subtitle: "Koin",
    type: "coin",
  },

  // =========================
  // Rp1.000 KERTAS
  // =========================

    {
      id: "paper-1000",
      image: "/images/uang-1000.png",
      front: "/images/uang-1000.png",
      back: "/images/1000-belakang.jpg",
      title: "Rp1.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-2000",
      image: "/images/uang-2000.png",
      front: "/images/uang-2000.png",
      back: "/images/2000-belakang.jpg",
      title: "Rp2.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-5000",
      image: "/images/uang-5000.png",
      front: "/images/uang-5000.png",
      back: "/images/5000-belakang.jpg",
      title: "Rp5.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-10000",
      image: "/images/uang-10000.png",
      front: "/images/uang-10000.png",
      back: "/images/10000-belakang.jpg",
      title: "Rp10.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-20000",
      image: "/images/uang-20000.png",
      front: "/images/uang-20000.png",
      back: "/images/20000-belakang.jpg",
      title: "Rp20.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-50000",
      image: "/images/uang-50000.png",
      front: "/images/uang-50000.png",
      back: "/images/50000-belakang.jpg",
      title: "Rp50.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },

    {
      id: "paper-100000",
      image: "/images/uang-100000.png",
      front: "/images/uang-100000.png",
      back: "/images/100000-belakang.jpg",
      title: "Rp100.000",
      subtitle: "Uang Kertas",
      type: "banknote",
    },
  ];
  

function MoneySlider() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let position = 0;
    let animationFrame;

    const speed = 1.5;

    const animate = () => {
      // Berhenti ketika cursor berada di atas uang
      if (!pausedRef.current) {
        position -= speed;

        const firstCard = track.children[0];

        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;
          const gap = 32;
          const moveWidth = cardWidth + gap;

          if (Math.abs(position) >= moveWidth) {
            track.appendChild(firstCard);
            position += moveWidth;
          }
        }

        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  return (
    <section className="money-slider-section" id="informasi">
      <div className="money-slider">
        <div
          className="money-track"
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {moneyData.map((money) => (
            <div
              className="money-card"
              key={money.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "money",
                  JSON.stringify(money)
                );
              }}
            >
              <img src={money.image} alt={money.title} />

              <div className="money-hover-info">
                <span>{money.title}</span>
                <small>{money.subtitle}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="money-slider-info">
          <span className="info-icon">ⓘ</span>
          <span>
            Arahkan kursor ke salah satu uang untuk melihat lebih dekat
          </span>
        </div>
      </div>
    </section>
  );
}

const moneyBackData = [
  {
    id: 1,
    image: "/images/1000-belakang.jpg",
    title: "Rp1.000",
  },
  {
    id: 2,
    image: "/images/2000-belakang.jpg",
    title: "Rp2.000",
  },
  {
    id: 3,
    image: "/images/5000-belakang.jpg",
    title: "Rp5.000",
  },
  {
    id: 4,
    image: "/images/10000-belakang.jpg",
    title: "Rp10.000",
  },
  {
    id: 5,
    image: "/images/20000-belakang.jpg",
    title: "Rp20.000",
  },
  {
    id: 6,
    image: "/images/50000-belakang.jpg",
    title: "Rp50.000",
  },
  {
    id: 7,
    image: "/images/100000-belakang.jpg",
    title: "Rp100.000",
  },
];


function MoneyBackSlider() {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);

useEffect(() => {
  const track = trackRef.current;

  if (!track) return;

  let animationFrame;

  const speed = 1.2;
  const cardWidth = track.children[0]?.offsetWidth || 285;
  const gap = 32;
  const moveWidth = cardWidth + gap;

  // Mulai sedikit dari kiri
  let position = -moveWidth;

  const animate = () => {
    if (!pausedRef.current) {

      // Bergerak ke kanan
      position += speed;

      // Ketika sudah sampai ujung
      if (position >= 0) {

        // Ambil CARD TERAKHIR
        const lastCard = track.lastElementChild;

        if (lastCard) {
          // Pindahkan card terakhir ke depan
          track.insertBefore(lastCard, track.firstElementChild);
        }

        // Geser kembali agar gerakan tetap mulus
        position -= moveWidth;
      }

      track.style.transform =
        `translate3d(${position}px, 0, 0)`;
    }

    animationFrame = requestAnimationFrame(animate);
  };

  animationFrame = requestAnimationFrame(animate);

  return () => {
    cancelAnimationFrame(animationFrame);
  };
}, []);

  const handleMouseEnter = () => {
    pausedRef.current = true;
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
  };

  return (
    <div className="money-slider money-slider-back">
      <div
        className="money-track"
        ref={trackRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {moneyBackData.map((money) => (
          <div className="money-card" key={money.id}>
            <img src={money.image} alt={`Bagian belakang ${money.title}`} />

            <div className="money-hover-info">
              <span>{money.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function App() {
  const [selectedMoney, setSelectedMoney] = useState(null);
  return (
    <div className="app">
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="main-navbar">
        <div className="navbar-container container-fluid">
          {/* =================================================
              BAGIAN KIRI
              LOGO BANK INDONESIA + CBPR
          ================================================= */}

          <div className="navbar-left">
            {/* LOGO BANK INDONESIA */}
            <a href="#koin" className="bi-logo">
              <img src="/images/logo-bi.png" alt="Bank Indonesia" />
            </a>

            {/* PEMBATAS */}
            <div className="brand-divider"></div>

            {/* LOGO CBPR */}
            <a href="#informasi" className="cbpr-logo">
              <img src="/images/logo-cbpr.png" alt="CBPR" />
            </a>
          </div>

          {/* =================================================
              MOBILE BUTTON
          ================================================= */}

          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Buka menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* =================================================
              MENU TENGAH
          ================================================= */}

          <div className="collapse navbar-collapse" id="mainNavigation">
            <nav className="custom-nav">
              <a href="#koin" className="custom-nav-link active">
                Beranda
              </a>

              <a href="#edukasi" className="custom-nav-link">
                Kito Belajar
              </a>

              <a href="#informasi" className="custom-nav-link">
                Kito Berbagi
              </a>

              <a href="#edukasi" className="custom-nav-link">
                Kito Bergerak
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================
          RUNNING TEXT / TICKER
      ===================================================== */}

      <div className="rupiah-ticker">
        <div className="ticker-track">
          {/* TICKER PERTAMA */}
          <div className="ticker-content">
            <span className="ticker-icon">✦</span>
            <span>
              Salah satu tugas Bank Indonesia adalah memastikan Rupiah tersedia
              dalam jumlah yang cukup, pecahan yang sesuai, dan dalam kondisi
              layak edar
            </span>

            <span className="ticker-icon">✦</span>
            <span>Kenali Rupiah lebih dekat melalui edukasi digital</span>

            <span className="ticker-icon">✦</span>
            <span>
              Bangga menggunakan Rupiah sebagai alat pembayaran yang sah di
              Indonesia
            </span>

            <span className="ticker-icon">✦</span>
          </div>

          {/* TICKER KEDUA
              DUPLIKAT AGAR GERAKAN TIDAK PUTUS
          */}
          <div className="ticker-content">
            <span className="ticker-icon">✦</span>
            <span>
              Salah satu tugas Bank Indonesia adalah memastikan Rupiah tersedia
              dalam jumlah yang cukup, pecahan yang sesuai, dan dalam kondisi
              layak edar
            </span>

            <span className="ticker-icon">✦</span>
            <span>Kenali Rupiah lebih dekat melalui edukasi digital</span>

            <span className="ticker-icon">✦</span>
            <span>
              Bangga menggunakan Rupiah sebagai alat pembayaran yang sah di
              Indonesia
            </span>

            <span className="ticker-icon">✦</span>
          </div>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">
        <div className="header-left">
          <div className="eyebrow">KOLEKSI RUPIAH</div>

          <h1>Museum Digital Rupiah</h1>

          <p>
            Uang Rupiah merupakan simbol kedaulatan bangsa Indonesia. Melalui
            Museum Digital Rupiah, Bank Indonesia mengajak masyarakat untuk
            mengenal Rupiah lebih dekat, memahami sejarahnya, dan bangga
            menggunakan Rupiah sebagai alat pembayaran yang sah di Indonesia.
          </p>
        </div>

        <div className="year">
          <span>Koleksi Mata Uang</span>
          <strong>Rupiah</strong>
        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="main">
        {/* =================================================
            COIN AREA
        ================================================= */}

        <section className="coin-layout" id="koin">
          {/* =================================================
              CARD KETERANGAN KIRI
          ================================================= */}

          <div className="money-side-card left">
            <div className="money-info">
              <span>NOMINAL</span>
              <strong>Rp1.000</strong>
            </div>

            <div className="money-info">
              <span>DIAMETER</span>
              <strong>24,15 mm</strong>
            </div>

            <div className="money-info">
              <span>TAHUN EMISI</span>
              <strong>2010</strong>
            </div>
          </div>

          {/* =================================================
              COIN 3D
          ================================================= */}

          <div className="coin-card">
            {/* COIN HEADER */}
            <div className="coin-header">
              <div>
                <span>3D EDUKASI</span>
                <h2>Koin Rp1.000</h2>
              </div>

              <div className="status">
                <i></i>
                <span>3D INTERAKTIF</span>
              </div>
            </div>

            {/* =================================================
                3D VIEWER
            ================================================= */}

            <div className="coin-viewer">
              <div className="viewer-glow"></div>
              <div className="viewer-grid"></div>

              {/* OBJEK 3D */}
              <div className="coin-3d-container">
                <Coin3D money={selectedMoney} />  
              </div>

              {/* INSTRUCTION */}
              <div className="instruction">
                <span className="mouse-icon">🖱</span>
                <span>Geser untuk memutar</span>
                <b>•</b>
                <span>Scroll untuk zoom</span>
              </div>
            </div>
          <div
            className={`money-drop-zone ${
              selectedMoney ? "has-money" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();

              const moneyData = e.dataTransfer.getData("money");

              if (!moneyData) return;

              const money = JSON.parse(moneyData);

              setSelectedMoney(money);
            }}
          >
            {selectedMoney ? (
              <>
                <div className="selected-money-label">
                  UANG TERPILIH
                </div>

                <img
                  src={selectedMoney.image}
                  alt={selectedMoney.title}
                  className="selected-money-image"
                />

                <strong className="selected-money-title">
                  {selectedMoney.title}
                </strong>

                <span className="selected-money-hint">
                  Uang berhasil dipilih
                </span>
              </>
            ) : (
              <>
                <div className="drop-icon">↓</div>

                <strong>Tarik uang ke sini</strong>

                <span>
                  Lepaskan uang untuk memilih pecahan
                </span>
              </>
            )}
          </div>
        </div>

          {/* =================================================
              CARD KETERANGAN KANAN
          ================================================= */}

          <div className="money-side-card right">
            <div className="money-info">
              <span>BAHAN</span>
              <strong>Logam</strong>
            </div>

            <div className="money-info">
              <span>TEBAL</span>
              <strong>1,60 mm</strong>
            </div>

            <div className="money-info">
              <span>PENGELUAR</span>
              <strong>Bank Indonesia</strong>
            </div>
          </div>
        </section>

        <MoneySlider />
        <MoneyBackSlider />

        {/* =====================================================
            EDUCATION
        ===================================================== */}

        <section className="education" id="edukasi">
          <div className="section-title">
            <span>INFORMASI KOIN</span>
            <h2>Kenali Rupiah Lebih Dekat</h2>
            <p>Pelajari karakteristik koin Rupiah melalui tampilan 3D interaktif.</p>
          </div>

          <div className="education-grid">
            {/* CARD 01 */}
            <article className="education-card">
              <div className="card-number">01</div>
              <h3>Sisi Depan</h3>
              <p>
                Menampilkan lambang Negara Kesatuan Republik Indonesia dan nilai
                nominal koin.
              </p>
            </article>

            {/* CARD 02 */}
            <article className="education-card">
              <div className="card-number">02</div>
              <h3>Sisi Belakang</h3>
              <p>
                Menampilkan gambar Angklung sebagai salah satu unsur budaya
                Indonesia.
              </p>
            </article>

            {/* CARD 03 */}
            <article className="education-card">
              <div className="card-number">03</div>
              <h3>Interaktif 3D</h3>
              <p>
                Putar koin untuk melihat permukaan depan, belakang, dan bagian
                sampingnya.
              </p>
            </article>
          </div>
        </section>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>BANK INDONESIA</strong>
            <span>Bank Sentral Republik Indonesia</span>
          </div>

          <div className="footer-right">
            Koleksi Digital Rupiah &nbsp; | &nbsp; 3D Edukasi &nbsp; | &nbsp;
            Untuk Indonesia Maju
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;