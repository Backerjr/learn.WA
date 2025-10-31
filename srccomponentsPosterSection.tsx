import { Link } from "react-router-dom";
import posterImg from "../assets/poster.jpg";

export const PosterSection: React.FC = () => (
  <section className="poster-section">
    <div className="container poster-wrapper">
      {/* LEFT – Poster image */}
      <div className="poster-image">
        <img src={posterImg} alt="RozmoWA poster (600×800)" />
      </div>

      {/* RIGHT – Text + CTA */}
      <div className="poster-content">
        <h2>Speak English Without Stress</h2>
        <p>
          RozmoWA teaches languages through real‑life situations, immersive
          conversation practice, and a supportive community.
        </p>
        <p>
          Whether you’re a beginner or an advanced learner, our curriculum
          adapts to your pace and goals.
        </p>

        <Link to="/offer" className="btn btn-primary">
          View Classes
        </Link>
        <Link to="/about" className="btn btn-primary">
          Meet Team
        </Link>

        {/* QUOTE BOX */}
        <div className="quote-box">
          "The grass isn't greener..." — Wiktoria
        </div>
      </div>
    </div>
  </section>
);