import './About.css';
import aboutHero from '../../assets/placeholder/pic1.jpg';
import logoImage from '../../assets/placeholder/The PILLAR Logo.png';
import facebookIcon from '../../assets/placeholder/facebook.png';
import gmailIcon from '../../assets/placeholder/gmail.png';
import instagramIcon from '../../assets/placeholder/instagram.avif';
import tiktokIcon from '../../assets/placeholder/tiktok.png';
import youtubeIcon from '../../assets/placeholder/youtube.jpg';


function About() {
  return (
    <div className="about-page">
      
      {/* SECTION 1: Who is The PILLAR? - CENTERED */}
      <section className="about-first-section">
        <div className="about-hero">
          <div className="about-hero__card">
            <img src={aboutHero} alt="The PILLAR Staff" />
          </div>
        </div>

        <div className="about-content">
          <h1 className="about-content__title">Who is The PILLAR?</h1>
          <div className="about-content__text">
            <p>
              The Pillar is the official student publication of the University of
              Eastern Philippines Main Campus. Since its founding, generations of
              writers have drawn from the pulse of society marked by struggles and
              transformations. The Pillar has stood with them—its pages echoing the 
              call to confront the inequities of their time through words that cut 
              deep and commentaries that ignite thought.
            </p>
            <p>
              As we turn each page, we are reminded of those who came before us—of
              their courage to write, to question, and to dissent. Though The Pillar
              holds the distinction of being one of the most enduring campus
              publications in the region, there is no single Pillar. Each generation 
              defines its own battles and raises its own voice against silence.
            </p>
            <p>
              To write is to challenge—to bridge generations through inquiry and conviction.
              It is an act that demands space: the right to question everything under the sun and beyond,
              and the freedom to do so without restraint. In this pursuit, The Pillar remains <strong>Critical. Fearless. Unapologetic.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* SEPARATION LINE */}
      <hr className="section-divider" />

      {/* SECTION 2: EDITORIAL BOARD */}
      <section className="editorial-board">
        <div className="board-header">
          <h2 className="board-title">EDITORIAL BOARD</h2>
          <p className="academic-year">A.Y.: 2025-2026</p>
          <div className="board-intro">
            <p>Textbooks crackle with anticipation, and minds prepare for intellectual journeys as the University of Eastern Philippines (UEP) once again welcomes a new academic year.</p>
            <p>Fresh faces, brimming with potential, join the ranks of returning students. Yet, beneath this veil of optimism lies a persistent undercurrent—unresolved issues that continue to plague the university.</p>
            <p>Despite the persistent calls for change from students, these challenges linger, stubbornly unaddressed. The dream of UEP becoming a true global leader in education and a beacon of academic excellence seems to recede further. However, amidst this simmering pot of unfulfilled aspirations, The Pillar stands resolute as a publication that is Critical, Fearless, and Unapologetic. ¶</p>
          </div>
        </div>

        <div className="staff-container">
          {/* 1. Editor-in-Chief (Image Right) */}
          <div className="staff-row eic-row">
            <div className="staff-info">
              <h3 className="staff-name">MARK KENDRICK ORSUA</h3>
              <p className="staff-role">EDITOR-IN-CHIEF</p>
              <div className="staff-underline"></div>
            </div>
            <div className="staff-card-wrapper">
              <div className="staff-card">
                <img src={aboutHero} alt="Staff" />
              </div>
            </div>
          </div>

          {/* 2. Managing Editor (Image Left) */}
          <div className="staff-row managing-row">
            <div className="staff-card-wrapper">
              <div className="staff-card">
                <img src={aboutHero} alt="Staff" />
              </div>
            </div>
            <div className="staff-info">
              <h3 className="staff-name">NELLE JANNA MALOOY</h3>
              <p className="staff-role">MANAGING EDITOR</p>
              <div className="staff-underline"></div>
            </div>
          </div>

          {/* 3. Associate Editor (Image Right) */}
          <div className="staff-row associate-row">
            <div className="staff-info">
              <h3 className="staff-name">ED ALMASCO</h3>
              <p className="staff-role">ASSOCIATE EDITOR</p>
              <div className="staff-underline"></div>
            </div>
            <div className="staff-card-wrapper">
              <div className="staff-card">
                <img src={aboutHero} alt="Staff" />
              </div>
            </div>
          </div>

          {/* Five 2-Grid Items (Members 4-13) */}
          <div className="staff-grid">
            {/* Grid Row 1 */}
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">ANGELO SURIO</h3>
              <p className="staff-role">NEWS EDITOR</p>
            </div>
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">TRISHA MAE DOCIL</h3>
              <p className="staff-role">FEATURE EDITOR</p>
            </div>
            {/* Grid Row 2 */}
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">SOPHIA ANDREI BASILOY</h3>
              <p className="staff-role">CULTURE EDITOR</p>
            </div>
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">JENCHOR TENEDERO</h3>
              <p className="staff-role">SPORTS EDITOR</p>
            </div>
            {/* Grid Row 3 */}
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">LHEIANNE GIE DALMACION</h3>
              <p className="staff-role">SCI-TECH EDITOR</p>
            </div>
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">MA. WENONA SAGONOY</h3>
              <p className="staff-role">HEAD PHOTOJOURNALIST</p>
            </div>
            {/* Grid Row 4 */}
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">JOMEL JAMES MODRIGO</h3>
              <p className="staff-role">HEAD CARTOONIST</p>
            </div>
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">ELISHA MISHAEL SALAZAR</h3>
              <p className="staff-role">HEAD BROADCASTER</p>
            </div>
            {/* Grid Row 5 */}
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">HEDRIC JOHN MARBIBI</h3>
              <p className="staff-role">HEAD VIDEO JOURNALIST</p>
            </div>
            <div className="grid-item">
              <div className="staff-card"><img src={aboutHero} alt="Staff" /></div>
              <h3 className="staff-name">ALENA RIVERA</h3>
              <p className="staff-role">FINANCIAL MANAGER</p>
            </div>
          </div>

          {/* 14. Last Solo Member (Centered) */}
          <div className="staff-solo-centered">
            <div className="staff-card-wrapper">
              <div className="staff-card">
                <img src={aboutHero} alt="Staff" />
              </div>
            </div>
            <div className="staff-info centered">
              <h3 className="staff-name">KYRUS BABON</h3>
              <p className="staff-role">ONLINE MANAGER</p>
            </div>
          </div>

        </div>
      </section>

      <hr className="section-divider" />

      {/* SECTION 3: STAFF MEMBERS */}
      <section className="staff-members-section">
        <h2 className="main-section-title">STAFF MEMBERS</h2>

        {/* STAFF WRITERS - Image Right */}
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
            <img src={aboutHero} alt="Writers" />
          </div>
        </div>

        {/* PHOTOJOURNALISTS - Image Left */}
        <div className="dept-row reverse">
          <div className="dept-image">
            <img src={aboutHero} alt="Photojournalists" />
          </div>
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
        </div>

        {/* CARTOONISTS - Image Right */}
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
            <img src={aboutHero} alt="Cartoonists" />
          </div>
        </div>

        {/* ADVISERS - 2 Grid Items */}
        <div className="adviser-grid">
          <div className="adviser-item">
            <div className="dept-image"><img src={aboutHero} alt="Adviser" /></div>
            <h3 className="adviser-name">DR. ANALIZA SALAZAR</h3>
            <p className="adviser-role">TECHNICAL ADVISER</p>
          </div>
          <div className="adviser-item">
            <div className="dept-image"><img src={aboutHero} alt="Adviser" /></div>
            <h3 className="adviser-name">LLOYD ADAM BAYLON</h3>
            <p className="adviser-role">FINANCIAL ADVISER</p>
          </div>
        </div>

        <div className="final-tagline">
          CRITICAL . FEARLESS . UNAPOLOGETIC .
        </div>
      </section>

      <hr className="section-divider" />

        {/* SECTION: FEEDBACK FORM */}

       <section className="feedback-section">
        <div className="feedback-form">
          <div className="feedback-form__header">
            <span className="feedback-form__pill">FEEDBACK FORM</span>
            <div className="feedback-form__rule" aria-hidden></div>
          </div>

          <h3 className="feedback-form__title">Have any questions, clarifications, or comments? Send us a message through the form below</h3>

          <form className="feedback-form__body" onSubmit={(e) => { e.preventDefault(); alert('Thanks — message sent (mock).'); }}>
            <label className="feedback-form__label">Email Address:</label>
            <input className="feedback-form__input" type="email" name="email" placeholder="you@example.com" required />

            <label className="feedback-form__label">Message:</label>
            <textarea className="feedback-form__textarea" name="message" rows={8} placeholder="Write your message here..." required></textarea>

            <div className="feedback-form__actions">
              <button type="submit" className="feedback-form__btn">Send Message</button>
            </div>
          </form>
        </div>
      </section>

       <footer className="site-footer">
              <div className="site-footer__inner">
                <div className="site-footer__left">
                  <div className="site-footer__brand">
                    <img src={logoImage} alt="The PILLAR Logo" className="site-footer__logo" />
                    <h2 className="site-footer__title">THE PILLAR</h2>
                  </div>
                  <p className="site-footer__desc"><strong>The Pillar</strong> is the official student publication of the University of Eastern Philippines-Main Campus. Upholding its tenet: <strong>Critical. Fearless. Unapologetic.</strong></p>
                  <p className="site-footer__copyright">© The Pillar. All Rights Reserved.</p>
                </div>
      
                <div className="site-footer__center">
                  <h4 className="site-footer__follow">Follow us:</h4>
                  <div className="site-footer__socials">
                    <a className="social" href="#" aria-label="Facebook"><img src={facebookIcon} alt="Facebook" /></a>
                    <a className="social" href="#" aria-label="Mail"><img src={gmailIcon} alt="Email" /></a>
                    <a className="social" href="#" aria-label="TikTok"><img src={tiktokIcon} alt="TikTok" /></a>
                    <a className="social" href="#" aria-label="Instagram"><img src={instagramIcon} alt="Instagram" /></a>
                    <a className="social" href="#" aria-label="YouTube"><img src={youtubeIcon} alt="YouTube" /></a>
                  </div>
                </div>
      
                <div className="site-footer__right">
                  <h4 className="site-footer__newsletter-title">Login to get your e-copies of newsletters:</h4>
                  <form className="site-footer__newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed (mock).'); }}>
                    <input type="email" className="site-footer__newsletter-input" placeholder="name123@gmail.com" />
                  </form>
                </div>
              </div>
            </footer>

    </div>
  );
}

export default About;