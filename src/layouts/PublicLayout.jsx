import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  ["/", "Home"],
  ["/about", "About"],
  ["/explore", "Explore"],
  ["/how-it-works", "How It Works"],
  ["/contact", "Contact"],
  ["/faq", "FAQ"],
];

export default function PublicLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  let storedUser = null;

  try {
    const savedUser = localStorage.getItem("skillbridge_user");
    storedUser = savedUser ? JSON.parse(savedUser) : null;
  } catch {
    storedUser = null;
  }

  const currentUser = user || storedUser;
  const dashboardPath = currentUser?.role === "admin" ? "/admin" : "/dashboard";

  function handleLogout() {
    if (logout) {
      logout();
    }

    localStorage.removeItem("skillbridge_token");
    localStorage.removeItem("skillbridge_user");

    navigate("/");
  }

  return (
    <>
      <header className="public-nav">
        <Link to="/" className="brand" title="Go to Home">
          <img src={logo} alt="SkillBridge logo" />

          <span>
            <b>Skill</b>
            <b>Bridge</b>
          </span>
        </Link>

        <nav>
          {navLinks.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {currentUser ? (
            <>
              <Link to={dashboardPath} className="btn btn-ghost btn-sm">
                Dashboard
              </Link>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>

              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      <Outlet />
    </>
  );
}
