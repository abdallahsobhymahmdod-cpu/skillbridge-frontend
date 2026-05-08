import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  LogOut,
  Save,
  Camera,
  Mail,
  Star,
  Shield,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import "./Profile.css";

const defaultUser = {
  id: 1,
  name: "Demo User",
  email: "user@skillbridge.com",
  role: "user",
  avatar: "",
  bio: "Passionate learner who enjoys exchanging practical skills with others.",
  location: "Cairo, Egypt",
  availability: "Weekends",
  level: "Beginner",
  skillsOffered: ["React"],
  skillsWanted: ["English"],
  rating: 4.9,
  reviewsCount: 24,
  sessionsCompleted: 18,
};

function getStoredUser() {
  try {
    const savedUser = localStorage.getItem("skillbridge_user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function splitSkills(value) {
  return value
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export default function Profile() {
  const navigate = useNavigate();
  const { user: authUser, logout } = useAuth();

  const initialUser = useMemo(() => {
    return {
      ...defaultUser,
      ...(authUser || {}),
      ...(getStoredUser() || {}),
    };
  }, [authUser]);

  const [activeTab, setActiveTab] = useState("profile");
  const [savedMessage, setSavedMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: initialUser.name || "",
    email: initialUser.email || "",
    bio: initialUser.bio || "",
    location: initialUser.location || "",
    availability: initialUser.availability || "Weekends",
    level: initialUser.level || "Beginner",
    skillsOffered: (initialUser.skillsOffered || []).join(", "),
    skillsWanted: (initialUser.skillsWanted || []).join(", "),
    avatar: initialUser.avatar || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const initials = profileForm.name
    ? profileForm.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "DU";

  function updateProfileField(field, value) {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function updatePasswordField(field, value) {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      updateProfileField("avatar", reader.result);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  }

  function handleRemoveAvatar() {
    updateProfileField("avatar", "");
    setPreviewOpen(false);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    setError("");
    setSavedMessage("");

    if (!profileForm.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!profileForm.email.trim()) {
      setError("Email is required.");
      return;
    }

    const updatedUser = {
      ...initialUser,
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      bio: profileForm.bio.trim(),
      location: profileForm.location.trim(),
      availability: profileForm.availability,
      level: profileForm.level,
      avatar: profileForm.avatar,
      skillsOffered: splitSkills(profileForm.skillsOffered),
      skillsWanted: splitSkills(profileForm.skillsWanted),
    };

    const updateProfilePayload = {
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      location: updatedUser.location,
      availability: updatedUser.availability,
      level: updatedUser.level,
      avatar: updatedUser.avatar,
      skillsOffered: updatedUser.skillsOffered,
      skillsWanted: updatedUser.skillsWanted,
    };

    console.log("Update profile payload ready for API:", updateProfilePayload);

    localStorage.setItem("skillbridge_user", JSON.stringify(updatedUser));
    window.dispatchEvent(new Event("skillbridge_user_updated"));

    setSavedMessage("Profile updated successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  }

  function handleChangePassword(e) {
    e.preventDefault();
    setPasswordMessage("");
    setError("");

    if (!passwordForm.currentPassword) {
      setError("Current password is required.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const changePasswordPayload = {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    };

    console.log(
      "Change password payload ready for API:",
      changePasswordPayload,
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage("Password changed successfully.");

    setTimeout(() => {
      setPasswordMessage("");
    }, 3000);
  }

  function handleLogout() {
    if (logout) {
      logout();
    }

    localStorage.removeItem("skillbridge_token");
    localStorage.removeItem("skillbridge_user");

    navigate("/login");
  }

  return (
    <main className="profile-page">
      <section className="profile-header-card">
        <div className="profile-cover" />

        <div className="profile-main-info">
          <div className="profile-avatar-wrap">
            <button
              type="button"
              className={`profile-avatar ${profileForm.avatar ? "clickable" : ""}`}
              onClick={() => {
                if (profileForm.avatar) {
                  setPreviewOpen(true);
                }
              }}
              title={
                profileForm.avatar ? "View profile image" : "Profile avatar"
              }
            >
              {profileForm.avatar ? (
                <img src={profileForm.avatar} alt={profileForm.name} />
              ) : (
                <span>{initials}</span>
              )}
            </button>

            <div className="profile-avatar-actions">
              <label
                className="profile-avatar-action-btn upload"
                title="Change profile image"
              >
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </label>

              {profileForm.avatar && (
                <button
                  type="button"
                  className="profile-avatar-action-btn remove"
                  onClick={handleRemoveAvatar}
                  title="Remove profile image"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="profile-name-block">
            <h1>{profileForm.name || "Demo User"}</h1>
            <p>
              <Mail size={15} />
              {profileForm.email || "user@skillbridge.com"}
            </p>

            <div className="profile-meta">
              <span>
                <Star size={15} />
                {initialUser.rating || 4.9} Rating
              </span>

              <span>
                <Shield size={15} />
                {initialUser.role || "user"}
              </span>

              <span>{initialUser.sessionsCompleted || 18} Sessions</span>
            </div>
          </div>
        </div>
      </section>

      <section className="profile-layout">
        <aside className="profile-account-menu">
          <button
            type="button"
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => {
              setActiveTab("profile");
              setError("");
            }}
          >
            <User size={18} />
            Profile
          </button>

          <button
            type="button"
            className={activeTab === "password" ? "active" : ""}
            onClick={() => {
              setActiveTab("password");
              setError("");
            }}
          >
            <Lock size={18} />
            Change Password
          </button>

          <button type="button" className="danger" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        <section className="profile-content-card">
          {activeTab === "profile" && (
            <>
              <div className="profile-section-title">
                <h2>Edit Profile</h2>
                <p>
                  Update your public SkillBridge identity and skill profile.
                </p>
              </div>

              {savedMessage && (
                <div className="profile-alert success">{savedMessage}</div>
              )}

              {error && <div className="profile-alert error">{error}</div>}

              <form onSubmit={handleSaveProfile} className="profile-form">
                <div className="profile-grid-2">
                  <div className="profile-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      value={profileForm.name}
                      onChange={(e) =>
                        updateProfileField("name", e.target.value)
                      }
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        updateProfileField("email", e.target.value)
                      }
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="profile-field">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    value={profileForm.bio}
                    onChange={(e) => updateProfileField("bio", e.target.value)}
                    placeholder="Tell others about yourself..."
                    rows="4"
                  />
                </div>

                <div className="profile-grid-3">
                  <div className="profile-field">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      type="text"
                      value={profileForm.location}
                      onChange={(e) =>
                        updateProfileField("location", e.target.value)
                      }
                      placeholder="Cairo, Egypt"
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="availability">Availability</label>
                    <select
                      id="availability"
                      value={profileForm.availability}
                      onChange={(e) =>
                        updateProfileField("availability", e.target.value)
                      }
                    >
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>

                  <div className="profile-field">
                    <label htmlFor="level">Skill Level</label>
                    <select
                      id="level"
                      value={profileForm.level}
                      onChange={(e) =>
                        updateProfileField("level", e.target.value)
                      }
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="profile-grid-2">
                  <div className="profile-field">
                    <label htmlFor="skillsOffered">Skills Offered</label>
                    <input
                      id="skillsOffered"
                      type="text"
                      value={profileForm.skillsOffered}
                      onChange={(e) =>
                        updateProfileField("skillsOffered", e.target.value)
                      }
                      placeholder="React, UI Design, English"
                    />
                    <small>Separate skills using commas.</small>
                  </div>

                  <div className="profile-field">
                    <label htmlFor="skillsWanted">Skills Wanted</label>
                    <input
                      id="skillsWanted"
                      type="text"
                      value={profileForm.skillsWanted}
                      onChange={(e) =>
                        updateProfileField("skillsWanted", e.target.value)
                      }
                      placeholder="Python, Spanish, Photography"
                    />
                    <small>Separate skills using commas.</small>
                  </div>
                </div>

                <div className="profile-preview-row">
                  <div>
                    <h3>Profile Preview</h3>
                    <p>This is how your skill tags will appear to others.</p>
                  </div>

                  <div className="profile-tag-preview">
                    {splitSkills(profileForm.skillsOffered).map((skill) => (
                      <span key={`offered-${skill}`} className="tag offered">
                        {skill}
                      </span>
                    ))}

                    {splitSkills(profileForm.skillsWanted).map((skill) => (
                      <span key={`wanted-${skill}`} className="tag wanted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button type="submit" className="profile-save-btn">
                  <Save size={17} />
                  Save Changes
                </button>
              </form>
            </>
          )}

          {activeTab === "password" && (
            <>
              <div className="profile-section-title">
                <h2>Change Password</h2>
                <p>Keep your account secure by updating your password.</p>
              </div>

              {passwordMessage && (
                <div className="profile-alert success">{passwordMessage}</div>
              )}

              {error && <div className="profile-alert error">{error}</div>}

              <form
                onSubmit={handleChangePassword}
                className="profile-form password-form"
              >
                <div className="profile-field">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      updatePasswordField("currentPassword", e.target.value)
                    }
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div className="profile-grid-2">
                  <div className="profile-field">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        updatePasswordField("newPassword", e.target.value)
                      }
                      placeholder="Min. 6 characters"
                      required
                    />
                  </div>

                  <div className="profile-field">
                    <label htmlFor="confirmPassword">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        updatePasswordField("confirmPassword", e.target.value)
                      }
                      placeholder="Repeat new password"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="profile-save-btn">
                  <Lock size={17} />
                  Update Password
                </button>
              </form>
            </>
          )}
        </section>
      </section>

      {previewOpen && profileForm.avatar && (
        <div
          className="profile-image-modal"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="profile-image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="profile-image-modal-close"
              onClick={() => setPreviewOpen(false)}
              title="Close"
            >
              <X size={20} />
            </button>

            <img src={profileForm.avatar} alt={profileForm.name} />
          </div>
        </div>
      )}
    </main>
  );
}
