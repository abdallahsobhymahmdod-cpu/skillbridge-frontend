import { useMemo, useState } from "react";
import {
  Users as UsersIcon,
  Search,
  Eye,
  ShieldOff,
  ShieldCheck,
  Star,
  CalendarCheck,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Filter,
  X,
} from "lucide-react";
import "./Users.css";

const initialUsers = [
  {
    id: 1,
    name: "Sara Mohamed",
    email: "sara@example.com",
    role: "user",
    status: "active",
    location: "Cairo, Egypt",
    level: "Intermediate",
    availability: "Weekends",
    joinedAt: "2026-03-12",
    skillsOffered: ["Python", "Data Analysis"],
    skillsWanted: ["React"],
    sessions: 14,
    rating: 4.9,
    reviews: [
      {
        id: 101,
        from: "Ahmed Ali",
        rating: 5,
        comment: "Great explanation and very organized session.",
        date: "2026-04-02",
      },
      {
        id: 102,
        from: "Lina Rashid",
        rating: 5,
        comment: "Helpful and patient teacher.",
        date: "2026-04-06",
      },
    ],
  },
  {
    id: 2,
    name: "Ali Karim",
    email: "ali@example.com",
    role: "user",
    status: "active",
    location: "Alexandria, Egypt",
    level: "Advanced",
    availability: "Evenings",
    joinedAt: "2026-02-20",
    skillsOffered: ["English", "Public Speaking"],
    skillsWanted: ["Node.js"],
    sessions: 9,
    rating: 4.7,
    reviews: [
      {
        id: 201,
        from: "Mona Adel",
        rating: 4,
        comment: "Good communication and clear examples.",
        date: "2026-03-28",
      },
    ],
  },
  {
    id: 3,
    name: "Lina Rashid",
    email: "lina@example.com",
    role: "user",
    status: "blocked",
    location: "Giza, Egypt",
    level: "Beginner",
    availability: "Flexible",
    joinedAt: "2026-01-18",
    skillsOffered: ["Graphic Design", "Photoshop"],
    skillsWanted: ["Python"],
    sessions: 6,
    rating: 4.3,
    reviews: [
      {
        id: 301,
        from: "Sara Mohamed",
        rating: 4,
        comment: "Creative work, but needs better time commitment.",
        date: "2026-03-18",
      },
    ],
  },
  {
    id: 4,
    name: "Omar Hassan",
    email: "omar@example.com",
    role: "user",
    status: "active",
    location: "Mansoura, Egypt",
    level: "Intermediate",
    availability: "Weekdays",
    joinedAt: "2026-04-01",
    skillsOffered: ["React", "UI Development"],
    skillsWanted: ["Spanish"],
    sessions: 3,
    rating: 4.8,
    reviews: [
      {
        id: 401,
        from: "Ali Karim",
        rating: 5,
        comment: "Excellent React explanation with practical examples.",
        date: "2026-04-08",
      },
    ],
  },
  {
    id: 5,
    name: "Mona Adel",
    email: "mona@example.com",
    role: "admin",
    status: "active",
    location: "Cairo, Egypt",
    level: "Advanced",
    availability: "Flexible",
    joinedAt: "2026-01-05",
    skillsOffered: ["Platform Management"],
    skillsWanted: ["Analytics"],
    sessions: 22,
    rating: 5,
    reviews: [
      {
        id: 501,
        from: "System",
        rating: 5,
        comment: "Trusted platform administrator.",
        date: "2026-04-10",
      },
    ],
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatStatus(status) {
  return status === "blocked" ? "Blocked" : "Active";
}

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("allUsers");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.skillsOffered
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.skillsWanted
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ? true : user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  const allReviews = useMemo(() => {
    return users.flatMap((user) =>
      user.reviews.map((review) => ({
        ...review,
        userName: user.name,
        userEmail: user.email,
      })),
    );
  }, [users]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const blockedUsers = users.filter((user) => user.status === "blocked").length;
  const totalReviews = allReviews.length;

  function handleToggleBlock(userId) {
    const targetUser = users.find((user) => user.id === userId);

    if (!targetUser) return;

    const nextStatus = targetUser.status === "blocked" ? "active" : "blocked";

    const blockPayload = {
      userId,
      status: nextStatus,
    };

    console.log("Block / unblock user payload ready for API:", blockPayload);

    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status: nextStatus } : user,
    );

    setUsers(updatedUsers);

    if (selectedUser?.id === userId) {
      setSelectedUser({
        ...selectedUser,
        status: nextStatus,
      });
    }
  }

  return (
    <main className="admin-users-page">
      <section className="admin-users-hero">
        <div>
          <span className="admin-users-badge">
            <UsersIcon size={15} />
            Users Management
          </span>

          <h1>Manage Platform Users</h1>

          <p>
            View all users, inspect user details, review feedback, and block or
            unblock accounts when needed.
          </p>
        </div>
      </section>

      <section className="admin-users-stats">
        <article className="admin-users-stat-card">
          <div className="admin-users-stat-icon purple">
            <UsersIcon size={23} />
          </div>
          <div>
            <strong>{totalUsers}</strong>
            <span>Total Users</span>
          </div>
        </article>

        <article className="admin-users-stat-card">
          <div className="admin-users-stat-icon green">
            <ShieldCheck size={23} />
          </div>
          <div>
            <strong>{activeUsers}</strong>
            <span>Active Users</span>
          </div>
        </article>

        <article className="admin-users-stat-card">
          <div className="admin-users-stat-icon red">
            <ShieldOff size={23} />
          </div>
          <div>
            <strong>{blockedUsers}</strong>
            <span>Blocked Users</span>
          </div>
        </article>

        <article className="admin-users-stat-card">
          <div className="admin-users-stat-icon orange">
            <Star size={23} />
          </div>
          <div>
            <strong>{totalReviews}</strong>
            <span>All Reviews</span>
          </div>
        </article>
      </section>

      <section className="admin-users-tabs">
        <button
          type="button"
          className={activeTab === "allUsers" ? "active" : ""}
          onClick={() => setActiveTab("allUsers")}
        >
          <UsersIcon size={17} />
          All Users
        </button>

        <button
          type="button"
          className={activeTab === "allReviews" ? "active" : ""}
          onClick={() => setActiveTab("allReviews")}
        >
          <Star size={17} />
          All Reviews
        </button>

        <button
          type="button"
          className={activeTab === "blocked" ? "active" : ""}
          onClick={() => {
            setActiveTab("blocked");
            setStatusFilter("blocked");
          }}
        >
          <ShieldOff size={17} />
          Blocked Users
        </button>
      </section>

      {activeTab !== "allReviews" && (
        <section className="admin-users-toolbar">
          <div className="admin-users-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="admin-users-filter">
            <Filter size={17} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </section>
      )}

      {activeTab !== "allReviews" && (
        <section className="admin-users-card">
          <div className="admin-users-table-wrap">
            <table className="admin-users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Skills Offered</th>
                  <th>Skills Wanted</th>
                  <th>Sessions</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user-cell">
                        <div className="admin-user-avatar">
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <strong>{user.name}</strong>
                          <span>{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="admin-tags">
                        {user.skillsOffered.map((skill) => (
                          <span key={skill} className="tag offered">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="admin-tags">
                        {user.skillsWanted.map((skill) => (
                          <span key={skill} className="tag wanted">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>{user.sessions}</td>

                    <td>
                      <span className="admin-rating">
                        <Star size={14} />
                        {user.rating}
                      </span>
                    </td>

                    <td>
                      <span className={`admin-status ${user.status}`}>
                        {formatStatus(user.status)}
                      </span>
                    </td>

                    <td>
                      <div className="admin-user-actions">
                        <button
                          type="button"
                          className="view"
                          onClick={() => setSelectedUser(user)}
                          title="View user details"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          type="button"
                          className={
                            user.status === "blocked" ? "unblock" : "block"
                          }
                          onClick={() => handleToggleBlock(user.id)}
                          title={
                            user.status === "blocked"
                              ? "Unblock user"
                              : "Block user"
                          }
                        >
                          {user.status === "blocked" ? (
                            <ShieldCheck size={16} />
                          ) : (
                            <ShieldOff size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <div className="admin-users-empty">
                <UsersIcon size={36} />
                <h3>No users found</h3>
                <p>Try changing the search or filter options.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "allReviews" && (
        <section className="admin-reviews-grid">
          {allReviews.map((review) => (
            <article className="admin-review-card" key={review.id}>
              <div className="admin-review-header">
                <div className="admin-user-avatar">
                  {getInitials(review.userName)}
                </div>

                <div>
                  <strong>{review.userName}</strong>
                  <span>{review.userEmail}</span>
                </div>
              </div>

              <div className="admin-review-stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    className={index < review.rating ? "filled" : ""}
                  />
                ))}
              </div>

              <p>{review.comment}</p>

              <div className="admin-review-footer">
                <span>From: {review.from}</span>
                <span>{review.date}</span>
              </div>
            </article>
          ))}
        </section>
      )}

      {selectedUser && (
        <div
          className="admin-user-modal-backdrop"
          onClick={() => setSelectedUser(null)}
        >
          <aside
            className="admin-user-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="admin-user-modal-close"
              onClick={() => setSelectedUser(null)}
              title="Close"
            >
              <X size={20} />
            </button>

            <div className="admin-user-modal-header">
              <div className="admin-user-avatar large">
                {getInitials(selectedUser.name)}
              </div>

              <div>
                <h2>{selectedUser.name}</h2>
                <p>{selectedUser.email}</p>

                <span className={`admin-status ${selectedUser.status}`}>
                  {formatStatus(selectedUser.status)}
                </span>
              </div>
            </div>

            <div className="admin-user-details-grid">
              <div>
                <Mail size={17} />
                <span>Email</span>
                <strong>{selectedUser.email}</strong>
              </div>

              <div>
                <MapPin size={17} />
                <span>Location</span>
                <strong>{selectedUser.location}</strong>
              </div>

              <div>
                <Clock size={17} />
                <span>Availability</span>
                <strong>{selectedUser.availability}</strong>
              </div>

              <div>
                <CalendarCheck size={17} />
                <span>Sessions</span>
                <strong>{selectedUser.sessions}</strong>
              </div>
            </div>

            <div className="admin-user-detail-section">
              <h3>Skills Offered</h3>
              <div className="admin-tags">
                {selectedUser.skillsOffered.map((skill) => (
                  <span key={skill} className="tag offered">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="admin-user-detail-section">
              <h3>Skills Wanted</h3>
              <div className="admin-tags">
                {selectedUser.skillsWanted.map((skill) => (
                  <span key={skill} className="tag wanted">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="admin-user-detail-section">
              <h3>User Reviews</h3>

              <div className="admin-user-reviews-list">
                {selectedUser.reviews.map((review) => (
                  <div className="admin-user-review" key={review.id}>
                    <div>
                      <strong>{review.from}</strong>
                      <span>{review.date}</span>
                    </div>

                    <p>
                      <Star size={14} />
                      {review.rating} - {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={
                selectedUser.status === "blocked"
                  ? "admin-modal-action unblock"
                  : "admin-modal-action block"
              }
              onClick={() => handleToggleBlock(selectedUser.id)}
            >
              {selectedUser.status === "blocked" ? (
                <>
                  <ShieldCheck size={18} />
                  Unblock User
                </>
              ) : (
                <>
                  <ShieldOff size={18} />
                  Block User
                </>
              )}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
