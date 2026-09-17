import Coin3D from "./components/Coin3D";


import "./App.css";


function App() {
  return (
    

      <div className="app">

        {/* =====================================================
            TOP NAVIGATION
        ===================================================== */}

        <div className="top-bar">

          <div className="top-inner">

            {/* BRAND */}

            <div className="brand">

              <div className="brand-symbol">
                BI
              </div>

              <div>
                <strong>
                  BANK INDONESIA
                </strong>

                <span>
                  Bank Sentral Republik Indonesia
                </span>
              </div>

            </div>


            {/* NAVIGATION */}

            <nav>

              <a href="#koin">
                Koin
              </a>

              <a href="#informasi">
                Informasi
              </a>

              <a href="#edukasi">
                Edukasi
              </a>

            </nav>

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
              Koin Rp1.000
            </h1>

            <p>
              Uang Logam Republik Indonesia
            </p>

          </div>


          <div className="year">

            <span>
              TAHUN EMISI
            </span>

            <strong>
              2010
            </strong>

          </div>

        </header>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="main">


          {/* =================================================
              3D COIN SECTION
          ================================================= */}

          <section
            className="coin-card"
            id="koin"
          >

            {/* -----------------------------------------------
                COIN HEADER
            ------------------------------------------------ */}

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


            {/* -----------------------------------------------
                3D VIEWER
            ------------------------------------------------ */}

            <div className="coin-viewer">

              {/* Background light */}

              <div className="viewer-glow"></div>

              <div className="viewer-grid"></div>


              {/* 3D COIN */}

              <Coin3D />


              {/* Instruction */}

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


            {/* =================================================
                INFORMATION
            ================================================= */}

            <section
              className="information"
              id="informasi"
            >

              {/* NOMINAL */}

              <div className="info-card">

                <span>
                  NOMINAL
                </span>

                <strong>
                  Rp1.000
                </strong>

              </div>


              {/* BAHAN */}

              <div className="info-card">

                <span>
                  BAHAN
                </span>

                <strong>
                  Logam
                </strong>

              </div>


              {/* DIAMETER */}

              <div className="info-card">

                <span>
                  DIAMETER
                </span>

                <strong>
                  24,15 mm
                </strong>

              </div>


              {/* TEBAL */}

              <div className="info-card">

                <span>
                  TEBAL
                </span>

                <strong>
                  1,60 mm
                </strong>

              </div>


              {/* TAHUN */}

              <div className="info-card">

                <span>
                  TAHUN EMISI
                </span>

                <strong>
                  2010
                </strong>

              </div>


              {/* PENGELUAR */}

              <div className="info-card">

                <span>
                  PENGELUAR
                </span>

                <strong>
                  Bank Indonesia
                </strong>

              </div>

            </section>

          </section>


          {/* =====================================================
              EDUCATION SECTION
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


            {/* EDUCATION CARDS */}

            <div className="education-grid">


              {/* =============================================
                  CARD 01
              ============================================== */}

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


              {/* =============================================
                  CARD 02
              ============================================== */}

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


              {/* =============================================
                  CARD 03
              ============================================== */}

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


            {/* FOOTER BRAND */}

            <div className="footer-brand">

              <strong>
                BANK INDONESIA
              </strong>

              <span>
                Bank Sentral Republik Indonesia
              </span>

            </div>


            {/* FOOTER RIGHT */}

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