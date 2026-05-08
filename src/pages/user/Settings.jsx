import { useState } from "react";
import {
  Settings as SettingsIcon,
  SlidersHorizontal,
  Bell,
  Save,
  Shield,
  Globe,
  Users,
  BrainCircuit,
  Mail,
  MessageSquare,
} from "lucide-react";
import "./Settings.css";

const tabs = [
  {
    id: "platform",
    label: "Platform Settings",
    icon: SettingsIcon,
  },
  {
    id: "matching",
    label: "Matching Settings",
    icon: SlidersHorizontal,
  },
  {
    id: "notifications",
    label: "Notification Settings",
    icon: Bell,
  },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("platform");
  const [savedMessage, setSavedMessage] = useState("");

  const [platformSettings, setPlatformSettings] = useState({
    platformName: "SkillBridge",
    supportEmail: "support@skillbridge.com",
    defaultLanguage: "English",
    maintenanceMode: false,
    allowNewRegistrations: true,
    enableReviews: true,
  });

  const [matchingSettings, setMatchingSettings] = useState({
    smartMatching: true,
    minimumMatchScore: 70,
    maxSuggestedMatches: 10,
    matchByAvailability: true,
    matchBySkillLevel: true,
    matchByRatings: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    sessionReminders: true,
    matchNotifications: true,
    reviewNotifications: true,
    adminReports: true,
    reminderTime: "24 hours before",
  });

  function updatePlatform(field, value) {
    setPlatformSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateMatching(field, value) {
    setMatchingSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updateNotifications(field, value) {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSave() {
    const settingsPayload = {
      platform: platformSettings,
      matching: matchingSettings,
      notifications: notificationSettings,
    };

    console.log("Admin settings payload ready for API:", settingsPayload);

    localStorage.setItem(
      "skillbridge_admin_settings",
      JSON.stringify(settingsPayload),
    );

    setSavedMessage("Settings saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  }

  return (
    <main className="admin-settings-page">
      <section className="admin-settings-hero">
        <div>
          <span className="admin-settings-badge">
            <Shield size={15} />
            Admin Control Center
          </span>

          <h1>Platform Settings</h1>
          <p>
            Manage SkillBridge platform behavior, smart matching rules, and
            notification preferences from one place.
          </p>
        </div>

        <button
          type="button"
          className="admin-settings-save"
          onClick={handleSave}
        >
          <Save size={18} />
          Save All Settings
        </button>
      </section>

      {savedMessage && (
        <div className="admin-settings-alert">
          <Save size={17} />
          {savedMessage}
        </div>
      )}

      <section className="admin-settings-layout">
        <aside className="admin-settings-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={activeTab === id ? "active" : ""}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </aside>

        <section className="admin-settings-card">
          {activeTab === "platform" && (
            <div className="admin-settings-section">
              <div className="admin-settings-title">
                <div className="admin-settings-title-icon">
                  <Globe size={22} />
                </div>
                <div>
                  <h2>Platform Settings</h2>
                  <p>
                    Control the general platform identity and public features.
                  </p>
                </div>
              </div>

              <div className="admin-settings-grid">
                <div className="admin-setting-field">
                  <label htmlFor="platformName">Platform Name</label>
                  <input
                    id="platformName"
                    type="text"
                    value={platformSettings.platformName}
                    onChange={(e) =>
                      updatePlatform("platformName", e.target.value)
                    }
                  />
                </div>

                <div className="admin-setting-field">
                  <label htmlFor="supportEmail">Support Email</label>
                  <input
                    id="supportEmail"
                    type="email"
                    value={platformSettings.supportEmail}
                    onChange={(e) =>
                      updatePlatform("supportEmail", e.target.value)
                    }
                  />
                </div>

                <div className="admin-setting-field">
                  <label htmlFor="defaultLanguage">Default Language</label>
                  <select
                    id="defaultLanguage"
                    value={platformSettings.defaultLanguage}
                    onChange={(e) =>
                      updatePlatform("defaultLanguage", e.target.value)
                    }
                  >
                    <option>English</option>
                    <option>Arabic</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>

              <div className="admin-settings-switches">
                <SettingSwitch
                  title="Allow New Registrations"
                  description="Let new users create accounts on SkillBridge."
                  checked={platformSettings.allowNewRegistrations}
                  onChange={(value) =>
                    updatePlatform("allowNewRegistrations", value)
                  }
                />

                <SettingSwitch
                  title="Enable Reviews"
                  description="Allow users to rate and review each other after sessions."
                  checked={platformSettings.enableReviews}
                  onChange={(value) => updatePlatform("enableReviews", value)}
                />

                <SettingSwitch
                  title="Maintenance Mode"
                  description="Temporarily disable access while maintaining the platform."
                  checked={platformSettings.maintenanceMode}
                  onChange={(value) => updatePlatform("maintenanceMode", value)}
                  danger
                />
              </div>
            </div>
          )}

          {activeTab === "matching" && (
            <div className="admin-settings-section">
              <div className="admin-settings-title">
                <div className="admin-settings-title-icon">
                  <BrainCircuit size={22} />
                </div>
                <div>
                  <h2>Matching Settings</h2>
                  <p>Configure how SkillBridge suggests users to each other.</p>
                </div>
              </div>

              <div className="admin-settings-grid">
                <div className="admin-setting-field">
                  <label htmlFor="minimumMatchScore">Minimum Match Score</label>
                  <input
                    id="minimumMatchScore"
                    type="number"
                    min="0"
                    max="100"
                    value={matchingSettings.minimumMatchScore}
                    onChange={(e) =>
                      updateMatching(
                        "minimumMatchScore",
                        Number(e.target.value),
                      )
                    }
                  />
                  <small>
                    Users below this score will not appear as strong matches.
                  </small>
                </div>

                <div className="admin-setting-field">
                  <label htmlFor="maxSuggestedMatches">
                    Max Suggested Matches
                  </label>
                  <input
                    id="maxSuggestedMatches"
                    type="number"
                    min="1"
                    max="50"
                    value={matchingSettings.maxSuggestedMatches}
                    onChange={(e) =>
                      updateMatching(
                        "maxSuggestedMatches",
                        Number(e.target.value),
                      )
                    }
                  />
                  <small>Number of matches shown in the user dashboard.</small>
                </div>
              </div>

              <div className="admin-settings-switches">
                <SettingSwitch
                  title="Enable Smart Matching"
                  description="Use skills offered and wanted to calculate best matches."
                  checked={matchingSettings.smartMatching}
                  onChange={(value) => updateMatching("smartMatching", value)}
                />

                <SettingSwitch
                  title="Match By Availability"
                  description="Prefer users who are free at similar times."
                  checked={matchingSettings.matchByAvailability}
                  onChange={(value) =>
                    updateMatching("matchByAvailability", value)
                  }
                />

                <SettingSwitch
                  title="Match By Skill Level"
                  description="Use beginner, intermediate, and advanced levels in matching."
                  checked={matchingSettings.matchBySkillLevel}
                  onChange={(value) =>
                    updateMatching("matchBySkillLevel", value)
                  }
                />

                <SettingSwitch
                  title="Match By Ratings"
                  description="Prioritize users with strong reputation and completed sessions."
                  checked={matchingSettings.matchByRatings}
                  onChange={(value) => updateMatching("matchByRatings", value)}
                />
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="admin-settings-section">
              <div className="admin-settings-title">
                <div className="admin-settings-title-icon">
                  <Bell size={22} />
                </div>
                <div>
                  <h2>Notification Settings</h2>
                  <p>Control email, match, session, and admin notifications.</p>
                </div>
              </div>

              <div className="admin-settings-grid">
                <div className="admin-setting-field">
                  <label htmlFor="reminderTime">Session Reminder Time</label>
                  <select
                    id="reminderTime"
                    value={notificationSettings.reminderTime}
                    onChange={(e) =>
                      updateNotifications("reminderTime", e.target.value)
                    }
                  >
                    <option>1 hour before</option>
                    <option>6 hours before</option>
                    <option>12 hours before</option>
                    <option>24 hours before</option>
                  </select>
                </div>
              </div>

              <div className="admin-settings-switches">
                <SettingSwitch
                  icon={Mail}
                  title="Email Notifications"
                  description="Send important updates to users via email."
                  checked={notificationSettings.emailNotifications}
                  onChange={(value) =>
                    updateNotifications("emailNotifications", value)
                  }
                />

                <SettingSwitch
                  icon={Users}
                  title="New Match Notifications"
                  description="Notify users when they receive new skill matches."
                  checked={notificationSettings.matchNotifications}
                  onChange={(value) =>
                    updateNotifications("matchNotifications", value)
                  }
                />

                <SettingSwitch
                  icon={MessageSquare}
                  title="Session Reminders"
                  description="Remind users before upcoming learning sessions."
                  checked={notificationSettings.sessionReminders}
                  onChange={(value) =>
                    updateNotifications("sessionReminders", value)
                  }
                />

                <SettingSwitch
                  icon={Star}
                  title="Review Notifications"
                  description="Ask users to review each other after completed sessions."
                  checked={notificationSettings.reviewNotifications}
                  onChange={(value) =>
                    updateNotifications("reviewNotifications", value)
                  }
                />

                <SettingSwitch
                  icon={Shield}
                  title="Admin Reports"
                  description="Send platform activity reports to administrators."
                  checked={notificationSettings.adminReports}
                  onChange={(value) =>
                    updateNotifications("adminReports", value)
                  }
                />
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

function SettingSwitch({
  title,
  description,
  checked,
  onChange,
  danger = false,
  icon: Icon,
}) {
  return (
    <div className={`admin-setting-switch ${danger ? "danger" : ""}`}>
      <div className="admin-setting-switch-content">
        {Icon && (
          <div className="admin-setting-mini-icon">
            <Icon size={17} />
          </div>
        )}

        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      <button
        type="button"
        className={`switch-btn ${checked ? "on" : ""}`}
        onClick={() => onChange(!checked)}
        aria-label={title}
      >
        <span />
      </button>
    </div>
  );
}
