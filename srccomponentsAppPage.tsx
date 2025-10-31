import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import screenshot1 from "../assets/screenshot1.jpg";
import screenshot2 from "../assets/screenshot2.jpg";
import screenshot3 from "../assets/screenshot3.jpg";

export const AppPage: React.FC = () => {
  const features = [
    { icon: "🎯", title: "Skill Tree", desc: "Track progress through levels." },
    { icon: "🎧", title: "Listen & Practice", desc: "Native‑speaker audio drills." },
    { icon: "📊", title: "Track Progress", desc: "Analytics and streaks." },
    { icon: "💡", title: "Interactive Exercises", desc: "Gamified practice." },
    { icon: "🏆", title: "Achievements", desc: "Earn badges as you improve." },
    { icon: "📱", title: "Mobile & Desktop", desc: "Learn anytime, anywhere." },
  ];

  return (
    <>
      <Header />
      <section className="container" style={{ padding: "3rem 0" }}>
        <Link to="/" className="back btn btn-primary">
          ← Back to Home
        </Link>

        <h1>RozmoWA App</h1>
        <p>All the features you love, now in the palm of your hand.</p>

        {/* FEATURE GRID */}
        <div className="feature-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <h4>{f.icon} {f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CALL‑TO‑ACTION – Launch Web App */}
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <a href="https://rozmowa-demo.vercel.app" target="_blank" rel="noopener noreferrer"
            className="btn btn-primary">
            Launch Web App →
          </a>
        </div>

        {/* DOWNLOAD BUTTONS */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <a href="#" className="btn btn-primary" style={{ marginRight: "1rem" }}>
            App Store
          </a>
          <a href="#" className="btn btn-primary">
            Google Play
          </a>
        </div>

        {/* SCREENSHOTS */}
        <h2>App Screenshots</h2>
        <div className="screenshot-grid">
          {[screenshot1, screenshot2, screenshot3].map((src, i) => (
            <div key={i} className="screenshot-card">
              <img src={src} alt={`RozmoWA screenshot ${i + 1}`} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};