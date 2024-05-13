export class AuthProvider {
  isAuthenticated: boolean;
  user: User | null;
  #authenticating: boolean;

  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.#authenticating = true;
    this.authenticate();
  }

  async authenticate() {
    this.#authenticating = true;
    try {
      const response = await fetch("/user");
      if (!response.ok)
        throw new Error("There was an error fetching the user.");
      this.isAuthenticated = true;
      this.user = await response.json();
    } catch (error) {
      this.user = null;
      this.isAuthenticated = false;
    } finally {
      this.#authenticating = false;
    }
  }

  get ready() {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (!this.#authenticating) {
          clearInterval(interval);
          resolve(false);
        }
      }, 1);
    });
  }

  async logout() {
    await fetch("/auth/logout", { method: "POST" });
    this.isAuthenticated = false;
    this.user = null;
  }
}

export const authProvider = new AuthProvider();
