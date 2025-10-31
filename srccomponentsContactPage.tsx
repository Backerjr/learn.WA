import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    // In a real app you would POST to a backend here.
    console.log("Form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <>
      <Header />
      <section className="container" style={{ padding: "3rem 0" }}>
        <Link to="/" className="back btn btn-primary">
          ← Back to Home
        </Link>

        <h1>Contact Us</h1>

        {sent && (
          <div className="success-message">
            🎉 Your message has been sent! We'll reply within 24 hours.
          </div>
        )}

        <div className="row" style={{ marginTop: "2rem", gap: "2rem" }}>
          {/* LEFT – CONTACT FORM */}
          <div className="col" style={{ flex: "1 1 300px" }}>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="form-control"
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && <div className="error">{errors.message}</div>}
              </div>

              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT – SOCIAL LINKS */}
          <div className="col" style={{ flex: "1 1 200px" }}>
            <h3>Connect with us</h3>
            <ul className="social-list">
              <li>📧 <a href="mailto:info@rozmowa.com">info@rozmowa.com</a></li>
              <li>📸 <a href="https://instagram.com/rozmowa" target="_blank">Instagram</a></li>
              <li>💼 <a href="https://linkedin.com/company/rozmowa" target="_blank">LinkedIn</a></li>
              <li>🐦 <a href="https://twitter.com/rozmowa" target="_blank">Twitter</a></li>
            </ul>
            <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
              We typically reply within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};