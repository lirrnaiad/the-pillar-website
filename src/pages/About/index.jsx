import React from 'react';
import { FeedbackForm } from '../../components/common';
import './About.css';

// --- Imports from src/assets/images/about-us/ ---
import heroImg from '../../assets/images/about-us/hero-img.png';
import kendrickOrsua from '../../assets/images/about-us/kendrick-orsua.png';
import nelleMalooy from '../../assets/images/about-us/nelle-malooy.png';
import edAlmasco from '../../assets/images/about-us/ed-almasco.png';
import angeloSurio from '../../assets/images/about-us/angelo-surio.png';
import trishaDocil from '../../assets/images/about-us/trisha-docil.png';
import sophiaBasiloy from '../../assets/images/about-us/sophia-basiloy.png';
import jenchorTenedero from '../../assets/images/about-us/jenchor-tenedero.png';
import lheianneDalmacion from '../../assets/images/about-us/lheianne-dalmacion.png';
import wenonaSagonoy from '../../assets/images/about-us/wenona-sagonoy.png';
import jomelModrigo from '../../assets/images/about-us/jomel-modrigo.png';
import elishaSalazar from '../../assets/images/about-us/elisha-salazar.png';
import hedricMarbibi from '../../assets/images/about-us/hedric-marbibi.png';
import financialManagers from '../../assets/images/about-us/financial-managers.png';
import kyrusBabon from '../../assets/images/about-us/kyrus-babon.png';
import staffWriters from '../../assets/images/about-us/staff-writers.png';
import photojournalists from '../../assets/images/about-us/photojournalists.png';
import cartoonists from '../../assets/images/about-us/cartoonists.png';
import videoJournalists from '../../assets/images/about-us/video-journalists.png';
import layoutArtists from '../../assets/images/about-us/layout-artists.png';
import broadcastJournalists from '../../assets/images/about-us/broadcast-journalists.png';
import analizaSalazar from '../../assets/images/about-us/analiza-salazar.png';
import lloydAdamBaylon from '../../assets/images/about-us/lloyd-adam-baylon.png';

function About() {
  return (
    <div className="about-page">
      
      {/* SECTION 1: HERO */}
      <section className="about-first-section">
        <div className="about-hero">
          <div className="about-hero__card">
            <img src={heroImg} alt="The PILLAR Team" />
          </div>
        </div>

        <div className="about-content">
          <h1 className="about-content__title">Who is The PILLAR?</h1>
          <div className="about-content__text">
            <p>
              The Pillar is the official student publication of the University of Eastern Philippines Main Campus. Since its founding, generations of writers have drawn from the pulse of society marked by struggles and transformations. The Pillar has stood with them—its pages echoing the call to confront the inequities of their time through words that cut deep and commentaries that ignite thought.
            </p>
            <p>
              As we turn each page, we are reminded of those who came before us—of their courage to write, to question, and to dissent. Though The Pillar holds the distinction of being one of the most enduring campus publications in the region, there is no single Pillar. Each generation defines its own battles and raises its own voice against silence.
            </p>
            <p>
              To write is to challenge—to bridge generations through inquiry and conviction. It is an act that demands space: the right to question everything under the sun and beyond, and the freedom to do so without restraint. In this pursuit, The Pillar remains <strong>Critical. Fearless. Unapologetic.</strong>
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* SECTION 2: EDITORIAL BOARD */}
      <section className="editorial-board">
        <div className="board-header">
          <h2 className="board-title">EDITORIAL BOARD</h2>
          <p className="academic-year">A.Y.: 2025-2026</p>
          <div className="board-intro">
            <p>Textbooks crackle with anticipation, and minds prepare for intellectual journeys as the University of Eastern Philippines (UEP) once again welcomes a new academic year.</p>
            <p>Fresh faces, brimming with potential, join the ranks of returning students. Yet, beneath this veil of optimism lies a persistent undercurrent—unresolved issues that continue to plague the university.</p>
            <p>Despite the persistent calls for change from students, these challenges linger, stubbornly unaddressed. The dream of UEP becoming a true global leader in education and a beacon of academic excellence seems to recede further. However, amidst this simmering pot of unfulfilled aspirations, The Pillar stands resolute as a publication that is Critical, Fearless, and Unapologetic.</p>
          </div>
        </div>

        <div className="staff-container">
          
          {/* TOP TRIO */}
          <div className="board-top-trio">
            {/* EIC */}
            <div className="trio-row">
              <div className="trio-image staff-card">
                <img src={kendrickOrsua} alt="Mark Kendrick Orsua" />
              </div>
              <div className="trio-info">
                <h3 className="staff-name">MARK KENDRICK ORSUA</h3>
                <p className="staff-role">EDITOR-IN-CHIEF</p>
              </div>
            </div>

            {/* Managing Editor (Reverse) */}
            <div className="trio-row reverse">
              <div className="trio-image staff-card">
                <img src={nelleMalooy} alt="Nelle Janna Malooy" />
              </div>
              <div className="trio-info">
                <h3 className="staff-name">NELLE JANNA MALOOY</h3>
                <p className="staff-role">MANAGING EDITOR</p>
              </div>
            </div>

            {/* Associate Editor */}
            <div className="trio-row">
              <div className="trio-image staff-card">
                <img src={edAlmasco} alt="Ed Almasco" />
              </div>
              <div className="trio-info">
                <h3 className="staff-name">ED ALMASCO</h3>
                <p className="staff-role">ASSOCIATE EDITOR</p>
              </div>
            </div>
          </div>

          {/* SECTION EDITORS GRID */}
          <div className="board-grid">
            <div className="grid-item">
              <div className="staff-card"><img src={angeloSurio} alt="Angelo Surio" /></div>
              <h3 className="staff-name">ANGELO SURIO</h3>
              <p className="staff-role">NEWS EDITOR</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={trishaDocil} alt="Trisha Mae Docil" /></div>
              <h3 className="staff-name">TRISHA MAE DOCIL</h3>
              <p className="staff-role">FEATURE EDITOR</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={sophiaBasiloy} alt="Sophia Andrei Basiloy" /></div>
              <h3 className="staff-name">SOPHIA ANDREI BASILOY</h3>
              <p className="staff-role">CULTURE EDITOR</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={jenchorTenedero} alt="Jenchor Tenedero" /></div>
              <h3 className="staff-name">JENCHOR TENEDERO</h3>
              <p className="staff-role">SPORTS EDITOR</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={lheianneDalmacion} alt="Lheianne Gie Dalmacion" /></div>
              <h3 className="staff-name">LHEIANNE GIE DALMACION</h3>
              <p className="staff-role">SCI-TECH EDITOR</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={wenonaSagonoy} alt="Ma. Wenona Sagonoy" /></div>
              <h3 className="staff-name">MA. WENONA SAGONOY</h3>
              <p className="staff-role">HEAD PHOTOJOURNALIST</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={jomelModrigo} alt="Jomel James Modrigo" /></div>
              <h3 className="staff-name">JOMEL JAMES MODRIGO</h3>
              <p className="staff-role">HEAD CARTOONIST</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={elishaSalazar} alt="Elisha Mishael Salazar" /></div>
              <h3 className="staff-name">ELISHA MISHAEL SALAZAR</h3>
              <p className="staff-role">HEAD BROADCASTER</p>
            </div>
            
             <div className="grid-item">
              <div className="staff-card"><img src={hedricMarbibi} alt="Hedric John Marbibi" /></div>
              <h3 className="staff-name">HEDRIC JOHN MARBIBI</h3>
              <p className="staff-role">HEAD VIDEO JOURNALIST</p>
            </div>

            <div className="grid-item">
              <div className="staff-card"><img src={financialManagers} alt="Financial Managers" /></div>
              <h3 className="staff-name">ALENA RIVERA<br/>ANTHONY ENANO</h3>
              <p className="staff-role">FINANCIAL MANAGERS</p>
            </div>
          </div>

          {/* ONLINE MANAGER (Solo Center) */}
          <div className="solo-section">
            <div className="staff-card">
              <img src={kyrusBabon} alt="Kyrus Babon" />
            </div>
            <h3 className="staff-name">KYRUS BABON</h3>
            <p className="staff-role">ONLINE MANAGER</p>
          </div>

        </div>
      </section>

      <hr className="section-divider" />

      {/* SECTION 3: STAFF MEMBERS */}
      <section className="staff-members-section">
        <h2 className="section-title">STAFF MEMBERS</h2>

        {/* 1. WRITERS (List Left, Image Right) */}
        <div className="dept-row">
          <div className="dept-info">
            <h3 className="dept-title">STAFF WRITERS</h3>
            <div className="dept-list">
              <p>LUIS MICHAEL GIRAY</p>
              <p>JANE EVELOUR LIMBAWAN</p>
              <p>CARLOS MIGUEL ROMINES</p>
              <p>NINO BALAWANG</p>
              <p>MARK RUEL PAGAL</p>
              <p>MYCHEL MATNOG</p>
            </div>
          </div>
          <div className="dept-image">
            <img src={staffWriters} alt="Staff Writers" />
          </div>
        </div>

        {/* 2. PHOTOJOURNALISTS (Image Left, List Right) */}
        <div className="dept-row reverse">
          <div className="dept-info">
            <h3 className="dept-title">PHOTOJOURNALISTS</h3>
            <div className="dept-list">
              <p>QUEEN PEARL SURIO</p>
              <p>PAOLO LEANDRO PINCA</p>
              <p>PHILIP BERNARD NAZARITA</p>
              <p>IREL LOUISE TORIO</p>
              <p>CLARENCE TUBALLAS</p>
            </div>
          </div>
           <div className="dept-image">
            <img src={photojournalists} alt="Photojournalists" />
          </div>
        </div>

        {/* 3. CARTOONISTS (List Left, Image Right) */}
        <div className="dept-row">
          <div className="dept-info">
            <h3 className="dept-title">CARTOONISTS</h3>
            <div className="dept-list">
              <p>DEXTER JARITO</p>
              <p>EJ DUHAYLUNGSOD</p>
              <p>JULLIENE ESPINA</p>
              <p>SOFIA MORALES</p>
              <p>KAREN ANNE CORNICO</p>
            </div>
          </div>
          <div className="dept-image">
            <img src={cartoonists} alt="Cartoonists" />
          </div>
        </div>

        {/* 4. VIDEO JOURNALISTS (Image Left, List Right) */}
        <div className="dept-row reverse">
          <div className="dept-info">
            <h3 className="dept-title">VIDEO JOURNALISTS</h3>
            <div className="dept-list">
              <p>JAMES VINCENT TENEDERO</p>
              <p>MAR JUSTIN CAPACIO</p>
              <p>VON ELSEN MENDOZA</p>
            </div>
          </div>
          <div className="dept-image">
            <img src={videoJournalists} alt="Video Journalists" />
          </div>
        </div>

         {/* 5. LAYOUT ARTISTS (List Left, Image Right) */}
         <div className="dept-row">
          <div className="dept-info">
            <h3 className="dept-title">LAYOUT ARTISTS</h3>
            <div className="dept-list">
              <p>LARY JAYDE RONCALES</p>
              <p>CARL SALDY MANAOG</p>
              <p>GRANT LUCENO</p>
              <p>PRESCILLA BIANES</p>
              <p>MARIEL KIMBERLY NOVIO</p>
            </div>
          </div>
          <div className="dept-image">
            <img src={layoutArtists} alt="Layout Artists" />
          </div>
        </div>

         {/* 6. BROADCAST JOURNALISTS (Image Left, List Right) */}
         <div className="dept-row reverse">
          <div className="dept-info">
            <h3 className="dept-title">BROADCAST JOURNS.</h3>
            <div className="dept-list">
              <p>JHON RUFERT DOROGA</p>
              <p>GARRY ESPINOLA</p>
              <p>SOFIA MARISTELA GALING</p>
              <p>MIKE LAURENCE BORBON</p>
              <p>ALPHA MARIE CANONOY</p>
              <p>CARLO MALABON</p>
            </div>
          </div>
          <div className="dept-image">
            <img src={broadcastJournalists} alt="Broadcast Journalists" />
          </div>
        </div>

        {/* ADVISERS */}
        <div className="duo-section">
          <div className="duo-item">
            <div className="staff-card"><img src={analizaSalazar} alt="Dr. Analiza Salazar" /></div>
            <h3 className="staff-name">DR. ANALIZA SALAZAR</h3>
            <p className="staff-role">TECHNICAL ADVISER</p>
          </div>
          <div className="duo-item">
            <div className="staff-card"><img src={lloydAdamBaylon} alt="Lloyd Adam Baylon" /></div>
            <h3 className="staff-name">LLOYD ADAM BAYLON</h3>
            <p className="staff-role">FINANCIAL ADVISER</p>
          </div>
        </div>

        <div className="final-tagline">
          CRITICAL. FEARLESS. UNAPOLOGETIC.
        </div>
      </section>
    </div>
  );
}

export default About;