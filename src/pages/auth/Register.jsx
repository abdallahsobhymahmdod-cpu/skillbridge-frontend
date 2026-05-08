import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Users2,
  BookOpen,
  TrendingUp,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import "./AuthPages.css";

const logo = "/logo.png";

const stats = [
  { icon: Users2, value: "2,400+", label: "Active Users" },
  { icon: BookOpen, value: "180+", label: "Skills Available" },
  { icon: TrendingUp, value: "4.9★", label: "Average Rating" },
];

const skillSuggestions = [
  "React",
  "Python",
  "English",
  "Design",
  "Node.js",
  "Photography",
  "Math",
  "Spanish",
];

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    skillOffered: "",
    skillWanted: "",
    skillLevel: "beginner",
    availability: "weekends",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function toggleSuggestion(skill) {
    setSelectedSuggestions((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      id: Date.now(),
      name: form.fullName,
      email: form.email,
      role: "user",
      skillsOffered: form.skillOffered ? [form.skillOffered] : [],
      skillsWanted: form.skillWanted
        ? [form.skillWanted, ...selectedSuggestions]
        : selectedSuggestions,
      level: form.skillLevel,
      availability: form.availability,
    };

    const registerPayload = {
      name: form.fullName,
      email: form.email,
      password: form.password,
      skillsOffered: user.skillsOffered,
      skillsWanted: user.skillsWanted,
      level: form.skillLevel,
      availability: form.availability,
      role: "user",
    };

    console.log("Register payload ready for API:", registerPayload);

    localStorage.setItem("skillbridge_token", "demo-token");
    localStorage.setItem("skillbridge_user", JSON.stringify(user));

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="auth-page">
      <section className="auth-side register-side">
        <div className="auth-dots" />
        <div className="auth-blob auth-blob-one" />
        <div className="auth-blob auth-blob-two" />

        <div className="auth-side-content">
          <div className="auth-logo-box">
            <img src={logo} alt="SkillBridge logo" />
          </div>

          <h1 className="auth-brand-title">
            <span className="brand-white">Join Skill</span>
            <span className="brand-green">Bridge</span>
          </h1>

          <p className="auth-side-subtitle">Connect. Learn. Teach.</p>

          <div className="auth-feature-list">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="auth-feature-card">
                <div className="auth-feature-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <h3>{value}</h3>
                  <p>{label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="auth-side-note">
            <GraduationCap size={16} />
            <span>Create your profile and start matching.</span>
          </div>
        </div>
      </section>

      <section className="auth-main">
        <div className="auth-card register-card">
          <div className="auth-card-header">
            <img src={logo} alt="SkillBridge logo" className="auth-card-logo" />
            <h2>Create your account</h2>
            <p>Build your skill profile and start exchanging</p>
          </div>

          <div className="auth-card-body">
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="fullName">Full name</label>
                  <span className="auth-required">Required</span>
                </div>

                <input
                  className="auth-input"
                  id="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  required
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                />
              </div>

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
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="auth-grid-2">
                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="auth-password-wrap">
                    <input
                      className="auth-input"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      required
                      value={form.password}
                      onChange={(e) => updateField("password", e.target.value)}
                    />

                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <div className="auth-label-row">
                    <label htmlFor="confirmPassword">Confirm password</label>
                  </div>

                  <div className="auth-password-wrap">
                    <input
                      className="auth-input"
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat password"
                      required
                      value={form.confirmPassword}
                      onChange={(e) =>
                        updateField("confirmPassword", e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirm((value) => !value)}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="auth-separator" />

              <div className="auth-grid-2">
                <div className="auth-field">
                  <label htmlFor="skillOffered">Skill you can teach</label>

                  <input
                    className="auth-input"
                    id="skillOffered"
                    type="text"
                    placeholder="e.g. React"
                    value={form.skillOffered}
                    onChange={(e) =>
                      updateField("skillOffered", e.target.value)
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="skillWanted">Skill you want to learn</label>

                  <input
                    className="auth-input"
                    id="skillWanted"
                    type="text"
                    placeholder="e.g. English"
                    value={form.skillWanted}
                    onChange={(e) => updateField("skillWanted", e.target.value)}
                  />
                </div>
              </div>

              <div className="auth-grid-2">
                <div className="auth-field">
                  <label htmlFor="skillLevel">Current level</label>

                  <select
                    className="auth-select"
                    id="skillLevel"
                    value={form.skillLevel}
                    onChange={(e) => updateField("skillLevel", e.target.value)}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="auth-field">
                  <label htmlFor="availability">Availability</label>

                  <select
                    className="auth-select"
                    id="availability"
                    value={form.availability}
                    onChange={(e) =>
                      updateField("availability", e.target.value)
                    }
                  >
                    <option value="weekdays">Weekdays</option>
                    <option value="weekends">Weekends</option>
                    <option value="evenings">Evenings</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="auth-field">
                <p className="auth-label">
                  Suggested skills you may want to learn
                </p>
                <p className="auth-helper">
                  Pick any extra skills to improve your first matches.
                </p>

                <div className="auth-skill-tags">
                  {skillSuggestions.map((skill) => {
                    const active = selectedSuggestions.includes(skill);

                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSuggestion(skill)}
                        className={`auth-skill-tag ${active ? "active" : ""}`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <button type="submit" disabled={loading} className="auth-submit">
                {loading ? "Creating account..." : "Create Account"}
                {!loading && <ArrowRight size={17} />}
              </button>

              <p className="auth-footer-text">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
