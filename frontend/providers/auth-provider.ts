const TEN_MINUTES = 1000 * 60 * 10;

export class AuthProvider {
  isAuthenticated: boolean = false;
  #user: User | null = null;
  #authenticating: boolean = true;
  #refreshingUser: boolean = false;
  #initialSetupComplete: boolean = false;
  #lastUpdateTimestamp: number = 0;
  #refreshTimeout: number | null = null;

  constructor() {
    this.#initialSetup();
  }

  get ready() {
    return new Promise((resolve) => {
      if (Date.now() - this.#lastUpdateTimestamp < TEN_MINUTES) {
        this.refreshUser();
      }
      const interval = setInterval(() => {
        if (
          !this.#authenticating &&
          !this.#refreshingUser &&
          this.#initialSetupComplete
        ) {
          clearInterval(interval);
          resolve(false);
        }
      }, 1);
    });
  }

  get user() {
    return this.#user;
  }

  async #initialSetup() {
    await this.authenticate();
    await this.refreshUser();
    this.#refreshTimeout = window.setTimeout(() => {
      this.refreshUser();
    }, TEN_MINUTES);
    this.#initialSetupComplete = true;
  }

  async authenticate() {
    this.#authenticating = true;
    try {
      const response = await fetch("/auth/check");
      if (!response.ok)
        throw new Error("There was an error fetching the user.");
      this.isAuthenticated = true;
    } catch (error) {
      this.isAuthenticated = false;
    } finally {
      this.#authenticating = false;
    }
  }

  async refreshUser() {
    if (this.#refreshingUser) return;
    this.#refreshingUser = true;
    try {
      const response = await fetch("/user");
      if (!response.ok)
        throw new Error("There was an error fetching the user.");
      this.isAuthenticated = true;
      this.#user = await response.json();
    } catch (error) {
      this.#user = null;
      this.isAuthenticated = false;
    } finally {
      this.#lastUpdateTimestamp = Date.now();
      this.resetTimeout();
    }
    this.#refreshingUser = false;
  }

  resetTimeout() {
    if (this.#refreshTimeout) {
      clearTimeout(this.#refreshTimeout);
    }
    this.#refreshTimeout = window.setTimeout(() => {
      this.refreshUser();
    }, TEN_MINUTES);
  }

  async logout() {
    await fetch("/auth/logout", { method: "POST" });
    this.isAuthenticated = false;
    this.#user = null;
    this.#lastUpdateTimestamp = 0;
    this.#refreshTimeout = null;
  }
}

export const authProvider = new AuthProvider();
