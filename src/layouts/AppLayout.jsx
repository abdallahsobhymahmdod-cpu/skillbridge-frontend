import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  LayoutDashboard,
  Lightbulb,
  Users2,
  CalendarCheck,
  MessageSquare,
  Star,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/context/AuthContext";
import { Avatar, Button } from "@/components/UI";

const links = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/skills", "My Skills", Lightbulb],
  ["/matches", "Matches", Users2],
  ["/sessions", "Sessions", CalendarCheck],
  ["/chat", "Chat", MessageSquare],
  ["/reviews", "Reviews", Star],
  ["/profile", "Profile", User],
  ["/settings", "Settings", Settings],
];

const titles = Object.fromEntries(links.map(([to, label]) => [to, label]));

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="side-brand" title="Go to Home">
          <img src={logo} alt="SkillBridge logo" />
          <div>
            <b>
              <span>Skill</span>
              <span>Bridge</span>
            </b>
            <small>Learn · Teach · Grow</small>
          </div>
        </Link>

        <nav>
          {links.map(([to, label, Icon]) => (
            <NavLink key={to} to={to}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <Button
          variant="ghost"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <LogOut size={16} />
          Logout
        </Button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>{titles[pathname] || "SkillBridge"}</h2>
            <p>Ready for your next skill exchange?</p>
          </div>
          <Avatar name={user?.name} />
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
