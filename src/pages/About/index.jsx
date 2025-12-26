import './About.css';

function About() {
  return (
    <div className="about">
      <div className="container">
        <header className="about__header">
          <h1 className="about__title">About The Pillar</h1>
          <p className="about__subtitle">Critical. Fearless. Unapologetic.</p>
        </header>

        <section className="about__section">
          <h2>Our Mission</h2>
          <p>
            The Pillar is the official student publication of the University of Eastern Philippines.
            We are committed to delivering accurate, fair, and timely news coverage to the UEP community
            and beyond.
          </p>
        </section>

        <section className="about__section">
          <h2>Editorial Board</h2>
          <p className="about__placeholder">
            Editorial board members will be listed here.
          </p>
        </section>

        <section className="about__section">
          <h2>Contact Us</h2>
          <p>
            For inquiries, submissions, or feedback, please reach out to us through our social media
            channels or use the contact form on our homepage.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;

