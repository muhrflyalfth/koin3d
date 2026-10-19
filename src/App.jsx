import { useEffect, useRef, useState } from "react";
import Coin3D from "./components/Coin3D";
import "./App.css";

// Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const moneyData = [
  // =========================
  // UANG KERTAS
  // =========================

    {
      id: "paper-1000",
      image: "/images/uang-1000.png",
      front: "/images/uang-1000.png",
      back: "/images/1000-belakang.jpg",
      title: "Rp1.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-2000",
      image: "/images/uang-2000.png",
      front: "/images/uang-2000.png",
      back: "/images/2000-belakang.jpg",
      title: "Rp2.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-5000",
      image: "/images/uang-5000.png",
      front: "/images/uang-5000.png",
      back: "/images/5000-belakang.jpg",
      title: "Rp5.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-10000",
      image: "/images/uang-10000.png",
      front: "/images/uang-10000.png",
      back: "/images/10000-belakang.jpg",
      title: "Rp10.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-20000",
      image: "/images/uang-20000.png",
      front: "/images/uang-20000.png",
      back: "/images/20000-belakang.jpg",
      title: "Rp20.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-50000",
      image: "/images/uang-50000.png",
      front: "/images/uang-50000.png",
      back: "/images/50000-belakang.jpg",
      title: "Rp50.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },

    {
      id: "paper-100000",
      image: "/images/uang-100000.png",
      front: "/images/uang-100000.png",
      back: "/images/100000-belakang.jpg",
      title: "Rp100.000",
      subtitle: "Uang Kertas TE 2022",
      type: "banknote",
    },
  ];

const createHistoricalBanknotes = (year, denominations, variants = {}) =>
  denominations.flatMap((denomination) => {
    const imageBase = `/images/${year}/te-${year}-kertas-${denomination}`;
    const title = `Rp${Number(denomination).toLocaleString("id-ID")}`;

    return [null, variants[denomination]].filter((variant) => variant !== undefined).map((variant) => {
      const variantLabel = {
        upgrading: "Upgrading",
        desainbaru: "Desain Baru",
      }[variant];
      const suffix = variant ? `-${variant}` : "";

      return {
        id: `paper-${year}-${denomination}${suffix}`,
        image: `${imageBase}-depan${suffix}.jpg`,
        front: `${imageBase}-depan${suffix}.jpg`,
        back: `${imageBase}-belakang${suffix}.jpg`,
        title,
        variantLabel,
        subtitle: `Uang Kertas TE ${year}${variantLabel ? ` ${variantLabel}` : ""}`,
        type: "banknote",
      };
    });
  });

const paper2016Data = createHistoricalBanknotes(2016, [
  "1000", "2000", "5000", "10000", "20000", "50000", "100000",
]);
const paper2014Data = createHistoricalBanknotes(2014, ["100000"]);
const paper2009Data = createHistoricalBanknotes(2009, ["2000"]);
const paper2005Data = createHistoricalBanknotes(
  2005,
  ["10000", "50000"],
  { 10000: "desainbaru", 50000: "upgrading" }
);
const paper2004Data = createHistoricalBanknotes(
  2004,
  ["20000", "100000"],
  { 20000: "upgrading", 100000: "upgrading" }
);
const paper2001Data = createHistoricalBanknotes(2001, ["5000"]);
const paper2000Data = createHistoricalBanknotes(2000, ["1000"]);

const coinData = [
  ["1970", "1"],
  ["1999", "50"],
  ["2001", "100"],
  ["2003", "200"],
  ["2003", "500"],
  ["2016", "100"],
  ["2016", "200"],
  ["2016", "500"],
].map(([year, denomination]) => {
  const basePath = `/coin/te-${year}-koin-${denomination}`;
  const front = `${basePath}-depan.jpg`;
  const back = `${basePath}-belakang.jpg`;

  return {
    id: `coin-${year}-${denomination}`,
    year,
    image: front,
    front,
    back,
    title: `Rp${Number(denomination).toLocaleString("id-ID")}`,
    subtitle: `Uang Logam TE ${year}`,
    type: "coin",
  };
});

function MoneySlider({ onSelectMoney, items = moneyData, id = "informasi", animate = false, specimen = false, side = "Depan", direction = "left", combineSides = false }) {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const moneySides = combineSides
    ? items.flatMap((money) => [
        { ...money, side: "Depan", image: money.front || money.image },
        { ...money, side: "Belakang", image: money.back || money.image },
      ])
    : animate
    ? [...items].reverse().map((money) => ({
        ...money,
        side,
        image: side === "Belakang"
          ? money.back || money.image
          : money.front || money.image,
      }))
    : items.flatMap((money) => [
        { ...money, side: "Depan", image: money.front || money.image },
        { ...money, side: "Belakang", image: money.back },
      ]);

  useEffect(() => {
    const track = trackRef.current;
    if (!animate || !track || track.children.length < 2) return;

    let position = 0;
    let animationFrame;
    const speed = 1.5;
    const gap = 32;
    const movesRight = direction === "right";

    if (movesRight) {
      const lastCard = track.children[track.children.length - 1];
      position = -(lastCard.offsetWidth + gap);
      track.style.transform = `translate3d(${position}px, 0, 0)`;
    }

    const animateTrack = () => {
      if (!pausedRef.current) {
        if (movesRight) {
          position += speed;
          if (position >= 0) {
            const lastCard = track.children[track.children.length - 1];
            if (lastCard) {
              const moveWidth = lastCard.offsetWidth + gap;
              track.prepend(lastCard);
              position -= moveWidth;
            }
          }
        } else {
          position -= speed;
          const firstCard = track.children[0];

          if (firstCard) {
            const moveWidth = firstCard.offsetWidth + gap;
            if (Math.abs(position) >= moveWidth) {
              track.appendChild(firstCard);
              position += moveWidth;
            }
          }
        }

        track.style.transform = `translate3d(${position}px, 0, 0)`;
      }

      animationFrame = requestAnimationFrame(animateTrack);
    };

    animationFrame = requestAnimationFrame(animateTrack);
    return () => {
      cancelAnimationFrame(animationFrame);
      track.style.transform = "";
    };
  }, [animate, direction]);

  return (
    <section className="money-slider-section" id={id}>
      <div className={`money-slider${animate ? " money-slider-animated" : ""}`}>
        <div
          className="money-track"
          ref={trackRef}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {moneySides.map((money) => (
            <div
              className={`money-card money-side-card${money.type === "coin" ? " coin-side-card" : ""}`}
              key={`${money.id}-${money.side}`}
              draggable
              role="button"
              tabIndex={0}
              onClick={() => onSelectMoney(money)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectMoney(money);
                }
              }}
              onDragStart={(e) => {
                e.dataTransfer.setData(
                  "money",
                  JSON.stringify(money)
                );
              }}
            >
              <img
                src={money.image}
                alt={money.variantLabel ? `${money.title}, ${money.variantLabel}` : money.title}
              />

              {money.year && (
                <span className="money-year-badge">{money.year}</span>
              )}

              {money.variantLabel && (
                <span className="money-variant-badge">
                  {money.variantLabel}
                </span>
              )}

              {specimen && (
                <div className="specimen-overlay" aria-hidden="true">
                  SPESIMEN
                </div>
              )}

              <div className="money-hover-info">
                <span>{money.title}</span>
                <small>{money.side}</small>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const emissionEditions = [
  { year: "2022", title: "Uang Kertas TE 2022", label: "Uang kertas", target: "edition-2022", items: moneyData },
  { year: "2016", title: "Uang Kertas TE 2016", label: "Uang kertas", target: "edition-2016", items: paper2016Data },
  { year: "2014", title: "Uang Kertas TE 2014", label: "Uang kertas", target: "edition-2014", items: paper2014Data },
  { year: "2009", title: "Uang Kertas TE 2009", label: "Uang kertas", target: "edition-2009", items: paper2009Data },
  { year: "2005", title: "Uang Kertas TE 2005", label: "Uang kertas", target: "edition-2005", items: paper2005Data },
  { year: "2004", title: "Uang Kertas TE 2004", label: "Uang kertas", target: "edition-2004", items: paper2004Data },
  { year: "2001", title: "Uang Kertas TE 2001", label: "Uang kertas", target: "edition-2001", items: paper2001Data },
  { year: "2000", title: "Uang Kertas TE 2000", label: "Uang kertas", target: "edition-2000", items: paper2000Data },
  { year: "1945", title: "Oeang Republik Indonesia", label: "ORI", target: "edition-1945" },
];

const banknoteEditions = emissionEditions.filter((edition) => edition.year !== "1945");
const archiveEditions = emissionEditions.filter((edition) => edition.year === "1945");
const emissionNavigationOptions = [
  ...emissionEditions,
  { year: "Koin", title: "Uang Logam", target: "coin-collection" },
];

function EmissionYearSlider({ activeYear, onSelectYear }) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!pickerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [isOpen]);

  const activeEdition = emissionNavigationOptions.find(
    (edition) => edition.year === activeYear
  );

  return (
    <section className="year-edition-navigation" aria-label="Pilih tahun emisi">
      <div className="year-edition-heading">
        <span>JELAJAHI BERDASARKAN TAHUN</span>
      </div>

      <div
        className="year-edition-picker"
        ref={pickerRef}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsOpen(false);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setIsOpen(false);
            triggerRef.current?.focus();
          }
        }}
      >
        <button
          className="year-edition-trigger"
          ref={triggerRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="year-edition-trigger-label">Tahun Emisi</span>
          <span className="year-edition-trigger-current">
            {activeEdition?.year === "Koin" ? activeEdition.title : activeEdition?.year}
          </span>
          <span className={`year-edition-chevron${isOpen ? " open" : ""}`} aria-hidden="true" />
        </button>

        {isOpen && (
          <div className="year-edition-menu" role="menu" aria-label="Pilih tahun emisi">
          {emissionNavigationOptions.map((edition) => (
            <button
              className={`year-edition-option${activeYear === edition.year ? " active" : ""}`}
              key={edition.year}
              type="button"
              role="menuitem"
              aria-current={activeYear === edition.year ? "true" : undefined}
              className={`year-edition-option${activeYear === edition.year ? " active" : ""}${edition.year === "Koin" ? " coin-option" : ""}`}
              onClick={(event) => {
                setIsOpen(false);
                onSelectYear(event, edition);
              }}
            >
              {edition.year !== "Koin" && (
                <strong className="year-edition-option-year">{edition.year}</strong>
              )}
              <span className="year-edition-option-title">{edition.title}</span>
            </button>
          ))}
          </div>
        )}
        </div>
    </section>
  );
}


function MoneyEditionSections({ onSelectMoney }) {
  return (
    <>
      {banknoteEditions.map((edition) => (
        <section
          className="emission-edition"
          id={edition.target}
          key={edition.year}
        >
          <div className="emission-edition-heading">
            <h2>
              {edition.year === "1945"
                ? edition.title
                : `${edition.label === "Uang kertas" ? "Uang Kertas" : "Uang Logam"} Tahun Emisi ${edition.year}`}
            </h2>
            {(["2022", "2016", "2005", "2004"].includes(edition.year)) && (
              <p>Dekatkan kursor/sentuh untuk menjeda putaran</p>
            )}
          </div>
          {edition.items ? (
            <>
              <MoneySlider
                id={edition.year === "2022" ? "informasi" : `${edition.target}-money`}
                items={edition.items}
                onSelectMoney={onSelectMoney}
                animate={["2022", "2016", "2005", "2004"].includes(edition.year)}
                combineSides={edition.year === "2005" || edition.year === "2004"}
                direction={edition.year === "2004" ? "right" : "left"}
                specimen={edition.year === "2016"}
              />
              {(edition.year === "2022" || edition.year === "2016") && (
                <MoneySlider
                  id={`${edition.target}-back-money`}
                  items={edition.items}
                  onSelectMoney={onSelectMoney}
                  animate
                  specimen={edition.year === "2016"}
                  side="Belakang"
                  direction="right"
                />
              )}
            </>
          ) : (
            <div className="edition-empty-state">
              <strong>Gambar edisi historis belum tersedia</strong>
              <p>Bagian ini siap diisi saat aset arsip tersedia.</p>
            </div>
          )}
        </section>
      ))}

      <section
        className="emission-edition coin-collection"
        id="coin-collection"
        aria-label="Koleksi uang logam"
      >
        <div className="emission-edition-heading">
          <h2>Koleksi Uang Logam</h2>
          <p>Jelajahi sisi depan dan belakang dari berbagai tahun emisi.</p>
        </div>

        <h3 className="coin-side-heading">Sisi Depan</h3>
        <MoneySlider
          id="coin-front-slider"
          items={coinData}
          onSelectMoney={onSelectMoney}
          animate
          side="Depan"
          direction="left"
        />

        <h3 className="coin-side-heading">Sisi Belakang</h3>
        <MoneySlider
          id="coin-back-slider"
          items={coinData}
          onSelectMoney={onSelectMoney}
          animate
          side="Belakang"
          direction="right"
        />
      </section>

      {archiveEditions.map((edition) => (
        <section
          className="emission-edition"
          id={edition.target}
          key={edition.year}
        >
          <div className="emission-edition-heading">
            <h2>{edition.title}</h2>
          </div>
          <div className="edition-empty-state">
            <strong>Gambar edisi historis belum tersedia</strong>
            <p>Bagian ini siap diisi saat aset arsip tersedia.</p>
          </div>
        </section>
      ))}
    </>
  );
}



function App() {
  const [selectedMoney, setSelectedMoney] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [activeEmissionYear, setActiveEmissionYear] = useState("2022");

  const showDashboard = (event, targetId = "dashboard") => {
    event?.preventDefault();
    setActiveView("dashboard");
    window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const selectEmissionYear = (event, edition) => {
    setActiveEmissionYear(edition.year);
    const navigation = document.getElementById("mainNavigation");
    const mobileMenuOpen =
      window.innerWidth <= 991 && navigation?.classList.contains("show");

    if (mobileMenuOpen) {
      event?.preventDefault();
      setActiveView("dashboard");
      navigation.addEventListener(
        "hidden.bs.collapse",
        () => {
          document.getElementById(edition.target)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
        { once: true }
      );
      document.querySelector(".custom-toggler")?.click();
      return;
    }

    showDashboard(event, edition.target);
  };

  const showThreeDActivity = (event) => {
    event?.preventDefault();
    setActiveView("threeD");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            <a href="#dashboard" className="bi-logo">
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
            <ul className="nav nav-underline custom-nav">
              <li className="nav-item">
                <a
                  href="#dashboard"
                  className={`nav-link ${activeView === "dashboard" ? "active" : ""}`}
                  aria-current={activeView === "dashboard" ? "page" : undefined}
                  onClick={showDashboard}
                >
                  Beranda
                </a>
              </li>

              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle ${activeView === "threeD" ? "active" : ""}`}
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Jelajah Rupiah
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#aktivitas-3d" onClick={showThreeDActivity}>
                      Aktivitas 3D
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#informasi" onClick={(event) => showDashboard(event, "informasi")}>
                      Koleksi Rupiah
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#coin-collection" onClick={(event) => showDashboard(event, "coin-collection")}>
                      Koleksi Uang Logam
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#edukasi" onClick={(event) => showDashboard(event, "edukasi")}>
                      Edukasi
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                >
                  Tahun Emisi
                </a>
                <ul className="dropdown-menu">
                  {emissionNavigationOptions.map((edition) => (
                    <li key={edition.year}>
                      <button
                        className={`dropdown-item${activeEmissionYear === edition.year ? " active" : ""}`}
                        type="button"
                        aria-current={activeEmissionYear === edition.year ? "true" : undefined}
                        onClick={(event) => selectEmissionYear(event, edition)}
                      >
                        {edition.year === "Koin"
                          ? edition.title
                          : `${edition.year} · ${edition.title}`}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

            </ul>
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

      </header>

      <EmissionYearSlider
        activeYear={activeEmissionYear}
        onSelectYear={selectEmissionYear}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        id="dashboard"
        className={`main ${
          activeView === "threeD" ? "three-d-mode" : "dashboard-mode"
        }`}
      >
        {activeView === "threeD" && (
          <div className="three-d-activity-header" id="aktivitas-3d">
            <div>
              <span>AKTIVITAS KHUSUS</span>
              <h2>Jelajahi Rupiah dalam 3D</h2>
              <p>Putar, zoom, dan lihat setiap sisi pecahan secara interaktif.</p>
            </div>
            <button type="button" onClick={showDashboard}>
              Kembali ke dashboard
            </button>
          </div>
        )}

        {/* =================================================
            COIN AREA
        ================================================= */}

          {/* =================================================
              COIN 3D
          ================================================= */}

          {activeView === "threeD" && (
          <div className="coin-card">
            {/* COIN HEADER */}
            <div className="coin-header">
              <div>
                <span>3D EDUKASI</span>
                <h2>
                  {selectedMoney
                    ? `${selectedMoney.subtitle} ${selectedMoney.title}`
                    : "Pilih Uang untuk Dilihat"}
                </h2>
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
                <span>Tarik untuk memutar</span>
                <b>•</b>
                <span>Scroll / cubit untuk zoom</span>
                <b>•</b>
                <span>Geser 2 jari untuk pindah</span>
                <b>•</b>
                <span>Ctrl + tarik untuk lihat ujung</span>
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
          )}

          {activeView === "dashboard" && (
            <MoneyEditionSections onSelectMoney={setSelectedMoney} />
          )}

          {/* =================================================
              CARD KETERANGAN KANAN
          ================================================= */}

          
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