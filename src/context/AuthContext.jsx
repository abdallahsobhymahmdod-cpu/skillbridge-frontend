import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const demoUsers = {
  user: {
    id: 1,
    name: "Demo User",
    email: "user@skillbridge.com",
    role: "user",
    avatar: "",
    skillsOffered: ["React"],
    skillsWanted: ["English"],
    availability: "Weekends",
    level: "Beginner",
  },
  admin: {
    id: 100,
    name: "Admin User",
    email: "admin@skillbridge.com",
    role: "admin",
    avatar: "",
    skillsOffered: [],
    skillsWanted: [],
    availability: "Flexible",
    level: "Advanced",
  },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("skillbridge_user") || "null");
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("skillbridge_token") || "";
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("skillbridge_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("skillbridge_user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("skillbridge_token", token);
    } else {
      localStorage.removeItem("skillbridge_token");
    }
  }, [token]);

  async function login(data) {
    setLoading(true);

    try {
      const email = data.email.trim().toLowerCase();
      const role = email.includes("admin") ? "admin" : "user";

      const loggedUser = {
        ...demoUsers[role],
        email,
      };

      const demoToken = `demo-${role}-token`;

      setUser(loggedUser);
      setToken(demoToken);

      localStorage.setItem("skillbridge_user", JSON.stringify(loggedUser));
      localStorage.setItem("skillbridge_token", demoToken);

      return {
        user: loggedUser,
        token: demoToken,
      };
    } finally {
      setLoading(false);
    }
  }

  async function register(data) {
    setLoading(true);

    try {
      const registeredUser = {
        id: Date.now(),
        name: data.name || data.fullName || "New User",
        email: data.email,
        role: "user",
        avatar: "",
        skillsOffered: data.skillsOffered || [],
        skillsWanted: data.skillsWanted || [],
        availability: data.availability || "Weekends",
        level: data.level || "Beginner",
      };

      const demoToken = "demo-user-token";

      setUser(registeredUser);
      setToken(demoToken);

      localStorage.setItem("skillbridge_user", JSON.stringify(registeredUser));
      localStorage.setItem("skillbridge_token", demoToken);

      return {
        user: registeredUser,
        token: demoToken,
      };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("skillbridge_user");
    localStorage.removeItem("skillbridge_token");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      role: user?.role,
      loading,
      login,
      register,
      logout,
      isAuthenticated: !!user,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
