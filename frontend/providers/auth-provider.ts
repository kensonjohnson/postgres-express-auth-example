export class AuthProvider {
  isAuthenticated: boolean;
  user: User | null;

  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  async authenticate() {
    console.log("Fire authenticate");
    try {
      const response = await fetch("/user");
      if (!response.ok)
        throw new Error("There was an error fetching the user.");
      this.user = await response.json();
      this.isAuthenticated = true;
    } catch (error) {
      this.user = null;
      this.isAuthenticated = false;
    }
  }

  async logout() {
    await fetch("/auth/logout", { method: "POST" });
    this.isAuthenticated = false;
    this.user = null;
  }
}

export const authProvider = new AuthProvider();
