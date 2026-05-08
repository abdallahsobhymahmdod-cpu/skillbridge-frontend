import {
  CalendarCheck,
  Lightbulb,
  MessageSquare,
  Star,
  TrendingUp,
  Users2,
  ArrowRight,
  Clock,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.png";
import "./Dashboard.css";

const userStats = [
  {
    label: "Total Skills",
    value: "6",
    sub: "+2 this week",
    icon: Lightbulb,
    gradient: "linear-gradient(135deg, #6c63ff, #8b84ff)",
  },
  {
    label: "Matches Found",
    value: "12",
    sub: "+5 new",
    icon: Users2,
    gradient: "linear-gradient(135deg, #00c9a7, #00b394)",
  },
  {
    label: "Sessions Done",
    value: "4",
    sub: "2 pending",
    icon: CalendarCheck,
    gradient: "linear-gradient(135deg, #3b82f6, #00c9a7)",
  },
  {
    label: "Avg Rating",
    value: "4.8★",
    sub: "8 reviews",
    icon: Star,
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
  },
];

const demandedSkills = [
  { name: "React", value: 92 },
  { name: "Python", value: 84 },
  { name: "English", value: 78 },
  { name: "Design", value: 66 },
  { name: "Node", value: 58 },
  { name: "Spanish", value: 42 },
];

const matches = [
  {
    name: "Sara Mohamed",
    initials: "SM",
    description: "Teaches Python · Wants React",
    score: "96%",
  },
  {
    name: "Ali Karim",
    initials: "AK",
    description: "Teaches English · Wants Node.js",
    score: "89%",
  },
  {
    name: "Lina Rashid",
    initials: "LR",
    description: "Teaches Graphic Design · Wants Python",
    score: "93%",
  },
];

const sessions = [
  {
    title: "Python with Sara Mohamed",
    time: "2026-04-11 · 3:00 PM",
    status: "pending",
  },
  {
    title: "React with Nagham Ahmed",
    time: "2026-04-12 · 5:00 PM",
    status: "confirmed",
  },
  {
    title: "Design with Lina Rashid",
    time: "2026-04-03 · 11:00 AM",
    status: "completed",
  },
];

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("skillbridge_user") || "null");
  } catch {
    return null;
  }
}

export default function Dashboard() {
  const user = getUser();

  const name = user?.name || "Demo User";
  const firstName = name.split(" ")[0] || "Demo";

  return (
    <main className="user-dashboard-page">
      <section className="user-dashboard-hero">
        <div className="user-dashboard-hero-text">
          <div className="user-dashboard-date">Friday, April 10, 2026</div>

          <h1>
            Good morning, {firstName} <span>👋</span>
          </h1>

          <p>
            Here&apos;s what&apos;s happening with your skills today. Track your
            matches, sessions, reputation, and learning progress.
          </p>

          <div className="user-dashboard-actions">
            <a href="/matches" className="user-dashboard-primary-btn">
              Find Matches
              <ArrowRight size={17} />
            </a>

            <a href="/skills" className="user-dashboard-secondary-btn">
              Manage Skills
            </a>
          </div>
        </div>

        <div className="user-dashboard-brand-card">
          <img src={logo} alt="SkillBridge logo" />
          <h2>
            <span>Skill</span>
            <span>Bridge</span>
          </h2>
          <p>Trade Skills. Grow Together.</p>
        </div>
      </section>

      <section className="user-dashboard-stats">
        {userStats.map(({ label, value, sub, icon: Icon, gradient }) => (
          <div className="user-stat-card" key={label}>
            <div className="user-stat-icon" style={{ background: gradient }}>
              <Icon size={24} />
            </div>

            <div>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{sub}</small>
            </div>
          </div>
        ))}
      </section>

      <section className="user-dashboard-grid">
        <div className="user-dashboard-card large">
          <div className="card-title-row">
            <div>
              <h2>Top Skills in Demand</h2>
              <p>Most requested skills across the platform.</p>
            </div>
            <TrendingUp size={22} />
          </div>

          <div className="skill-bars">
            {demandedSkills.map((skill) => (
              <div className="skill-bar-item" key={skill.name}>
                <div className="skill-bar-label">
                  <span>{skill.name}</span>
                  <strong>{skill.value}%</strong>
                </div>

                <div className="skill-bar-track">
                  <div style={{ width: `${skill.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="user-dashboard-card">
          <div className="card-title-row">
            <div>
              <h2>My Skills Breakdown</h2>
              <p>Offering vs. learning balance.</p>
            </div>
            <Sparkles size={22} />
          </div>

          <div className="donut-wrap">
            <div className="donut-chart">
              <div className="donut-hole">
                <strong>50%</strong>
                <span>Balanced</span>
              </div>
            </div>

            <div className="donut-legend">
              <span>
                <i className="offering" />
                Offering
              </span>

              <span>
                <i className="wanting" />
                Learning
              </span>
            </div>
          </div>
        </div>

        <div className="user-dashboard-card">
          <div className="card-title-row">
            <div>
              <h2>Recent Matches</h2>
              <p>People who fit your skill exchange profile.</p>
            </div>

            <a href="/matches">View all</a>
          </div>

          <div className="compact-list">
            {matches.map((match) => (
              <div className="compact-row" key={match.name}>
                <div className="row-avatar">{match.initials}</div>

                <div className="row-content">
                  <strong>{match.name}</strong>
                  <span>{match.description}</span>
                </div>

                <em>{match.score}</em>
              </div>
            ))}
          </div>
        </div>

        <div className="user-dashboard-card">
          <div className="card-title-row">
            <div>
              <h2>Upcoming Sessions</h2>
              <p>Your scheduled learning sessions.</p>
            </div>

            <a href="/sessions">View all</a>
          </div>

          <div className="compact-list">
            {sessions.map((session) => (
              <div className="compact-row" key={session.title}>
                <div className="row-icon">
                  {session.status === "completed" ? (
                    <CheckCircle size={20} />
                  ) : (
                    <Clock size={20} />
                  )}
                </div>

                <div className="row-content">
                  <strong>{session.title}</strong>
                  <span>{session.time}</span>
                </div>

                <em className={`status ${session.status}`}>{session.status}</em>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
