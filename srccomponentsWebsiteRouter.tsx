import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./LandingPage";
import { AboutPage } from "./AboutPage";
import { OfferPage } from "./OfferPage";
import { ContactPage } from "./ContactPage";
import { AppPage } from "./AppPage";

export const WebsiteRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/offer" element={<OfferPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/app" element={<AppPage />} />
      {/* If you ever want a dedicated poster page you could add:
          <Route path="/poster" element={<PosterSection />} /> */}
    </Routes>
  </BrowserRouter>
);