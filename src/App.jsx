import Coin3D from "./components/Coin3D";

import "./App.css";

// Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
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

            <a
              href="#koin"
              className="bi-logo"
            >

              <img
                src="/images/logo-bi.png"
                alt="Bank Indonesia"
              />

            </a>


            {/* PEMBATAS */}

            <div className="brand-divider"></div>


            {/* LOGO CBPR */}

            <a
              href="#informasi"
              className="cbpr-logo"
            >

              <img
                src="/images/logo-cbpr.png"
                alt="CBPR"
              />

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

          <div
            className="collapse navbar-collapse"
            id="mainNavigation"
          >

            <nav className="custom-nav">

              <a
                href="#koin"
                className="custom-nav-link active"
              >
                Beranda
              </a>


              <a
                href="#edukasi"
                className="custom-nav-link"
              >
                Kito Belajar
              </a>


              <a
                href="#informasi"
                className="custom-nav-link"
              >
                Kito Berbagi
              </a>


              <a
                href="#edukasi"
                className="custom-nav-link"
              >
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

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Salah satu tugas Bank Indonesia adalah memastikan
              Rupiah tersedia dalam jumlah yang cukup, pecahan
              yang sesuai, dan dalam kondisi layak edar
            </span>

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Kenali Rupiah lebih dekat melalui edukasi digital
            </span>

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Bangga menggunakan Rupiah sebagai alat pembayaran
              yang sah di Indonesia
            </span>

            <span className="ticker-icon">
              ✦
            </span>

          </div>


          {/* TICKER KEDUA
              DUPLIKAT AGAR GERAKAN TIDAK PUTUS
          */}

          <div className="ticker-content">

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Salah satu tugas Bank Indonesia adalah memastikan
              Rupiah tersedia dalam jumlah yang cukup, pecahan
              yang sesuai, dan dalam kondisi layak edar
            </span>

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Kenali Rupiah lebih dekat melalui edukasi digital
            </span>

            <span className="ticker-icon">
              ✦
            </span>

            <span>
              Bangga menggunakan Rupiah sebagai alat pembayaran
              yang sah di Indonesia
            </span>

            <span className="ticker-icon">
              ✦
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">

        <div className="header-left">

          <div className="eyebrow">
            KOLEKSI RUPIAH
          </div>

          <h1>
            Museum Digital Rupiah
          </h1>

          <p>
            Uang Rupiah merupakan simbol kedaulatan bangsa Indonesia. Melalui Museum Digital Rupiah, Bank Indonesia mengajak masyarakat untuk mengenal Rupiah lebih dekat, memahami sejarahnya, dan bangga menggunakan Rupiah sebagai alat pembayaran yang sah di Indonesia.
          </p>

        </div>


        <div className="year">

          <span>
            Koleksi Mata Uang
          </span>

          <strong>
            Rupiah
          </strong>

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

                <span>
                  3D EDUKASI
                </span>

                <h2>
                  Koin Rp1.000
                </h2>

              </div>


              <div className="status">

                <i></i>

                <span>
                  3D INTERAKTIF
                </span>

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
                <Coin3D />
              </div>


              {/* INSTRUCTION */}

              <div className="instruction">

                <span className="mouse-icon">
                  🖱
                </span>

                <span>
                  Geser untuk memutar
                </span>

                <b>
                  •
                </b>

                <span>
                  Scroll untuk zoom
                </span>

              </div>

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


        {/* =====================================================
            EDUCATION
        ===================================================== */}

        <section
          className="education"
          id="edukasi"
        >

          <div className="section-title">

            <span>
              INFORMASI KOIN
            </span>

            <h2>
              Kenali Rupiah Lebih Dekat
            </h2>

            <p>
              Pelajari karakteristik koin Rupiah
              melalui tampilan 3D interaktif.
            </p>

          </div>


          <div className="education-grid">

            {/* CARD 01 */}

            <article className="education-card">

              <div className="card-number">
                01
              </div>

              <h3>
                Sisi Depan
              </h3>

              <p>
                Menampilkan lambang Negara
                Kesatuan Republik Indonesia
                dan nilai nominal koin.
              </p>

            </article>


            {/* CARD 02 */}

            <article className="education-card">

              <div className="card-number">
                02
              </div>

              <h3>
                Sisi Belakang
              </h3>

              <p>
                Menampilkan gambar Angklung
                sebagai salah satu unsur
                budaya Indonesia.
              </p>

            </article>


            {/* CARD 03 */}

            <article className="education-card">

              <div className="card-number">
                03
              </div>

              <h3>
                Interaktif 3D
              </h3>

              <p>
                Putar koin untuk melihat
                permukaan depan, belakang,
                dan bagian sampingnya.
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

            <strong>
              BANK INDONESIA
            </strong>

            <span>
              Bank Sentral Republik Indonesia
            </span>

          </div>


          <div className="footer-right">

            Koleksi Digital Rupiah
            &nbsp; | &nbsp;
            3D Edukasi
            &nbsp; | &nbsp;
            Untuk Indonesia Maju

          </div>

        </div>

      </footer>

    </div>
  );
}


export default App;