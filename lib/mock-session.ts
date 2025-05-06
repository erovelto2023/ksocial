// This is a helper to create a mock session for preview environments
export function getMockSession(role = "user") {
  return {
    user: {
      id: role === "admin" ? "1" : "2",
      name: role === "admin" ? "Admin User" : "Regular User",
      email: role === "admin" ? "admin@example.com" : "user@example.com",
      role: role,
      image: null,
    },
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  }
}
