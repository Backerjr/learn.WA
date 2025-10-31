import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PosterSection } from "./PosterSection";

export const LandingPage: React.FC = () => {
  const cards = [
    {
      title: "Our Mission",
      description: "Empowering learners to communicate confidently.",
    },
    {
      title: "Our Lessons",
      description: "Interactive, real‑world focused modules.",
      link: "/offer",
    },
    {
      title: "RozmoWA App",
      description: "Practice anytime, anywhere on mobile.",
      link: "/app",
    },
    {
      title: "Testimonials",
      description: "What our students say about us.",
    },
    {
      title: "Join Us",
      description: "Become part of our global community.",
      link: "/contact",
    },
  ];

  return (
    <>
      <Header />
      {/* ── HERO ─── */}
      <section className="hero">
        <h1>Language is not learned — it's lived.</h1>
        <p>Discover RozmoWA's modern language approach</p>

        {/* CTA buttons – internal navigation where appropriate */}
        <Link to="/offer" className="btn btn-primary">
          Explore Our Classes
        </Link>
        <Link to="/app" className="btn btn-primary">
          Download App
        </Link>
        <Link to="/contact" className="btn btn-primary">
          Start Learning Today
        </Link>
      </section>

      {/* ── CARD GRID ─── */}
      <main className="container">
        <div className="cards">
          {cards.map((c, i) => (
            <article key={i} className="card">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              {c.link && (
                <Link to={c.link} className="btn">
                  Learn More
                </Link>
              )}
            </article>
          ))}
        </div>
      </main>

      {/* ── POSTER SECTION (part of the landing page) ─── */}
      <PosterSection />

      <Footer />
    </>
  );
};