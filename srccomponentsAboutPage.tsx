import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import team1 from "../assets/team1.jpg";
import team2 from "../assets/team2.jpg";
import team3 from "../assets/team3.jpg";

export const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Wiktoria",
      role: "Founder & Lead Teacher",
      img: team1,
      bio: "Passionate about making language learning fun and stress‑free.",
    },
    {
      name: "Anna Kowalska",
      role: "Senior Language Coach",
      img: team2,
      bio: "Specialist in conversational fluency and cultural immersion.",
    },
    {
      name: "Michael Stevens",
      role: "Pronunciation Specialist",
      img: team3,
      bio: "Focuses on native‑like intonation and accent reduction.",
    },
  ];

  const values = [
    {
      title: "Authentic Communication",
      emoji: "💬",
      text: "Talk like a native, not a textbook.",
    },
    {
      title: "Cultural Understanding",
      emoji: "🌍",
      text: "Learn the stories behind the language.",
    },
    {
      title: "Practical Learning",
      emoji: "🛠️",
      text: "Use what you learn from day one.",
    },
    {
      title: "Human Connection",
      emoji: "🤝",
      text: "Community matters – we learn together.",
    },
  ];

  return (
    <>
      <Header />
      <section className="container about" style={{ padding: "3rem 0" }}>
        {/* BACK BUTTON */}
        <Link to="/" className="back btn btn-primary">
          ← Back to Home
        </Link>

        <h1>About RozmoWA</h1>

        {/* OUR STORY */}
        <h2>Our Story</h2>
        <p>
          Founded in 2022 by a group of language‑enthusiasts, RozmoWA grew out
          of the belief that language learning should be as natural as a
          conversation with a friend. From a single classroom in Warsaw we now
          serve learners in over 30 countries.
        </p>

        {/* OUR MISSION */}
        <h2>Our Mission</h2>
        <p>
          We aim to make English (and other languages) accessible, engaging,
          and stress‑free. Our AI‑assisted platform adapts to each learner’s
          style, providing instant feedback, authentic dialogues, and cultural
          insights.
        </p>

        {/* MEET OUR TEAM */}
        <h2 id="team">Meet Our Team</h2>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p><em>{member.role}</em></p>
              <p>{member.bio}</p>
            </div>
          ))}
        </div>

        {/* OUR VALUES */}
        <h2>Our Values</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div key={i} className="value-card">
              <h4>{v.emoji} {v.title}</h4>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};