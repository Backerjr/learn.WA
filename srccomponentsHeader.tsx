import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "About", path: "/about" },
  { label: "Offer", path: "/offer" },
  { label: "Contact", path: "/contact" },
  { label: "App", path: "/app" },
];

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/">rozmoWA‑App</Link>
        </div>
        <nav className="site-nav">
          {navItems.map((it) => (
            <Link
              key={it.path}
              to={it.path}
              className={location.pathname === it.path ? "active" : undefined}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};