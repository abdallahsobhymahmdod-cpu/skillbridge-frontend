import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Users2,
  Zap,
  Star,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import "./AuthPages.css";

const logo = "/logo.png";

const features = [
  {
    icon: Users2,
    title: "Smart Skill Matching",
    description: "Find people who teach what you want to learn.",
  },
  {
    icon: Zap,
    title: "Fast Skill Exchange",
    description: "Start learning without paying money.",
  },
  {
    icon: Star,
    title: "Trusted Reviews",
    description: "Build your reputation through ratings.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("user@skillbridge.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      const res = await login({
        email,
        password,
      });

      if (res.user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-side">
        <div className="auth-dots" />
        <div className="auth-blob auth-blob-one" />
        <div className="auth-blob auth-blob-two" />

        <div className="auth-side-content">
          <div className="auth-logo-box">
            <img src={logo} alt="SkillBridge logo" />
          </div>

          <h1 className="auth-brand-title">
            <span className="brand-white">Skill</span>
            <span className="brand-green">Bridge</span>
          </h1>

          <p className="auth-side-subtitle">Trade Skills, Grow Together</p>

          <div className="auth-feature-list">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="auth-feature-card">
                <div className="auth-feature-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="auth-side-note">
            <BookOpen size={16} />
            <span>Learn from people. Teach what you know.</span>
          </div>
        </div>
      </section>

      <section className="auth-main">
        <div className="auth-card">
          <div className="auth-card-header">
            <img src={logo} alt="SkillBridge logo" className="auth-card-logo" />
            <h2>Welcome back</h2>
            <p>Log in to your SkillBridge account</p>
          </div>

          <div className="auth-card-body">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="email">Email address</label>
                  <span className="auth-required">Required</span>
                </div>

                <input
                  className="auth-input"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">Password</label>
                  <button type="button" className="auth-forgot">
                    Forgot password?
                  </button>
                </div>

                <div className="auth-password-wrap">
                  <input
                    className="auth-input"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={loading} className="auth-submit">
                {loading ? "Logging in..." : "Log In"}
                {!loading && <ArrowRight size={17} />}
              </button>

              <div className="auth-divider">or</div>

              <p className="auth-footer-text">
                No account? <Link to="/register">Sign up</Link>
              </p>

              <p className="auth-demo">
                Demo user: user@skillbridge.com
                <br />
                Demo admin: admin@skillbridge.com
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
