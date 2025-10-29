import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const OfferPage: React.FC = () => {
  const classTypes = [
    {
      title: "Group Classes",
      price: "$20 / session",
      icon: "👥",
      description: "Learn with peers, share experiences.",
    },
    {
      title: "Private Lessons",
      price: "$45 / session",
      icon: "👤",
      description: "One‑on‑one focus on your goals.",
      popular: true,
    },
    {
      title: "Online Learning",
      price: "Free to start",
      icon: "📱",
      description: "Study from anywhere at your own pace.",
    },
  ];

  const levels = [
    {
      title: "Beginner (A1‑A2)",
      description:
        "Basics: alphabet, greetings, essential vocabulary, simple present.",
    },
    {
      title: "Intermediate (B1‑B2)",
      description:
        "Complex sentences, past & future tenses, everyday conversation.",
    },
    {
      title: "Advanced (C1‑C2)",
      description:
        "Fluency, nuance, idioms, academic & business English.",
    },
  ];

  return (
    <>
      <Header />
      <section className="container" style={{ padding: "3rem 0" }}>
        {/* BACK BUTTON */}
        <Link to="/" className="back btn btn-primary">
          ← Back to Home
        </Link>

        <h1>Our Offerings</h1>
        <p>Choose the learning path that suits your goals and schedule.</p>

        {/* CLASS TYPE CARDS */}
        <div className="class-grid">
          {classTypes.map((c, i) => (
            <div key={i} className="class-card">
              <h3>
                {c.icon} {c.title}
                {c.popular && <span className="badge">POPULAR</span>}
              </h3>
              <p>{c.description}</p>
              <p>
                <strong>{c.price}</strong>
              </p>
            </div>
          ))}
        </div>

        <h2 style={{ marginTop: "2rem" }}>All Levels Welcome</h2>

        {/* LEVEL CARDS */}
        <div className="level-grid">
          {levels.map((lvl, i) => (
            <div key={i} className="level-card">
              <h3>{lvl.title}</h3>
              <p>{lvl.description}</p>
            </div>
          ))}
        </div>

        {/* CALL‑TO‑ACTION */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/contact" className="btn btn-primary">
            Get Started – Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};