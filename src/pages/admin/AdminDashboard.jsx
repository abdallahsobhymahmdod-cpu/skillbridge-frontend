import {
  Users,
  CalendarCheck,
  Layers,
  Zap,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Shield,
  ArrowRight,
  BarChart3,
  Settings,
  GitBranch,
  FileText,
  UserCog,
} from "lucide-react";
import "./AdminDashboard.css";

const stats = [
  {
    label: "Total Users",
    value: "2,400+",
    sub: "+128 this month",
    icon: Users,
    className: "purple",
  },
  {
    label: "Active Sessions",
    value: "320",
    sub: "48 live today",
    icon: CalendarCheck,
    className: "green",
  },
  {
    label: "Total Skills",
    value: "180+",
    sub: "+14 new skills",
    icon: Layers,
    className: "blue",
  },
  {
    label: "New Matches Today",
    value: "76",
    sub: "+22%",
    icon: Zap,
    className: "orange",
  },
];

const quickLinks = [
  {
    title: "Manage Users",
    description: "View, block, unblock, and manage all users.",
    path: "/admin/users",
    icon: UserCog,
    className: "purple",
  },
  {
    title: "Manage Skills",
    description: "Add, edit, delete, and organize platform skills.",
    path: "/admin/skills",
    icon: Layers,
    className: "blue",
  },
  {
    title: "Matches",
    description: "Review suggested matches and matching activity.",
    path: "/admin/matches",
    icon: GitBranch,
    className: "green",
  },
  {
    title: "Sessions",
    description: "Track pending, active, and completed sessions.",
    path: "/admin/sessions",
    icon: CalendarCheck,
    className: "orange",
  },
  {
    title: "Reports",
    description: "Open analytics reports and platform insights.",
    path: "/admin/reports",
    icon: FileText,
    className: "pink",
  },
  {
    title: "Settings",
    description: "Platform, matching, and notification settings.",
    path: "/admin/settings",
    icon: Settings,
    className: "dark",
  },
];

const healthItems = [
  { label: "User Growth", value: 82 },
  { label: "Session Completion", value: 74 },
  { label: "Matching Accuracy", value: 91 },
  { label: "Review Quality", value: 88 },
];

const topSkills = [
  { name: "React", users: 420 },
  { name: "Python", users: 380 },
  { name: "English", users: 345 },
  { name: "Graphic Design", users: 278 },
  { name: "Node.js", users: 250 },
];

const activities = [
  {
    title: "New user registered",
    description: "Mona Ali joined SkillBridge",
    type: "success",
  },
  {
    title: "Session completed",
    description: "React session finished successfully",
    type: "success",
  },
  {
    title: "Review reported",
    description: "A user reported an inappropriate review",
    type: "warning",
  },
  {
    title: "New skill added",
    description: "Machine Learning was added to skills list",
    type: "success",
  },
];

export default function AdminDashboard() {
  return (
    <main className="admin-dashboard-page">
      <section className="admin-dashboard-welcome">
        <div>
          <span className="admin-dashboard-badge">
            <Shield size={15} />
            Admin Control Center
          </span>

          <h1>Platform Overview</h1>

          <p>
            Monitor users, active sessions, skills, matches, reports, and
            platform settings directly from this dashboard.
          </p>
        </div>

        <div className="admin-dashboard-actions">
          <a href="/admin/users" className="admin-dashboard-primary-btn">
            Manage Users
            <ArrowRight size={17} />
          </a>

          <a href="/admin/reports" className="admin-dashboard-secondary-btn">
            View Reports
          </a>
        </div>
      </section>

      <section className="admin-dashboard-stats">
        {stats.map(({ label, value, sub, icon: Icon, className }) => (
          <article className="admin-stat-card" key={label}>
            <div className={`admin-stat-icon ${className}`}>
              <Icon size={23} />
            </div>

            <div>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{sub}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="admin-quick-access-section">
        <div className="admin-section-heading">
          <div>
            <h2>Admin Quick Access</h2>
            <p>Go directly to the main admin management pages.</p>
          </div>
        </div>

        <div className="admin-quick-access-grid">
          {quickLinks.map(
            ({ title, description, path, icon: Icon, className }) => (
              <a href={path} className="admin-quick-card" key={title}>
                <div className={`admin-quick-icon ${className}`}>
                  <Icon size={22} />
                </div>

                <div className="admin-quick-content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>

                <ArrowRight className="admin-quick-arrow" size={18} />
              </a>
            ),
          )}
        </div>
      </section>

      <section className="admin-dashboard-main-grid">
        <article className="admin-dashboard-card">
          <div className="admin-card-header">
            <div>
              <h2>Platform Health</h2>
              <p>Key operating indicators for the platform.</p>
            </div>

            <Activity size={22} />
          </div>

          <div className="admin-health-list">
            {healthItems.map((item) => (
              <div className="admin-health-item" key={item.label}>
                <div className="admin-health-label">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="admin-health-track">
                  <div style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-card-header">
            <div>
              <h2>Today Overview</h2>
              <p>Quick snapshot of today&apos;s activity.</p>
            </div>

            <TrendingUp size={22} />
          </div>

          <div className="admin-overview-grid">
            <div>
              <strong>42</strong>
              <span>New Users</span>
            </div>

            <div>
              <strong>76</strong>
              <span>New Matches</span>
            </div>

            <div>
              <strong>18</strong>
              <span>New Sessions</span>
            </div>

            <div>
              <strong>9</strong>
              <span>New Reviews</span>
            </div>
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-card-header">
            <div>
              <h2>Top Skills</h2>
              <p>Most active skills by users.</p>
            </div>

            <a href="/admin/skills">Manage</a>
          </div>

          <div className="admin-top-skills">
            {topSkills.map((skill, index) => (
              <div className="admin-top-skill-row" key={skill.name}>
                <div className="admin-rank">{index + 1}</div>

                <div>
                  <strong>{skill.name}</strong>
                  <span>{skill.users} users</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="admin-dashboard-card">
          <div className="admin-card-header">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest platform actions and alerts.</p>
            </div>

            <a href="/admin/activity">View all</a>
          </div>

          <div className="admin-activity-list">
            {activities.map((item) => (
              <div className="admin-activity-row" key={item.title}>
                <div className={`admin-activity-icon ${item.type}`}>
                  {item.type === "warning" ? (
                    <AlertTriangle size={18} />
                  ) : (
                    <CheckCircle size={18} />
                  )}
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-dashboard-bottom">
        <article className="admin-dashboard-card admin-insight-card">
          <div className="admin-card-header">
            <div>
              <h2>Matching Performance</h2>
              <p>Smart matching activity and quality indicators.</p>
            </div>

            <BarChart3 size={22} />
          </div>

          <div className="admin-matching-grid">
            <div>
              <strong>91%</strong>
              <span>Average Match Accuracy</span>
            </div>

            <div>
              <strong>76</strong>
              <span>New Matches Today</span>
            </div>

            <div>
              <strong>12</strong>
              <span>Pending Session Requests</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
