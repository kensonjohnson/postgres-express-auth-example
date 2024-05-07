import express from "express";
import { configurePassport } from "./controllers/passport/passport.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("build/frontend"));

// Passport
configurePassport(app);

// Routes
import authRouter from "./routes/auth.js";
import userController from "./routes/user.js";
import { ensureAuthenticated } from "./controllers/auth-controller.js";
import listRouter from "./routes/list.js";
import { catchUnmatchedRequestAndRedirectEncoded } from "./controllers/root-controller.js";

// app.use("/", rootRouter); // serve static files
app.use("/auth", authRouter);
app.use("/user", ensureAuthenticated, userController);
app.use("/list", ensureAuthenticated, listRouter);
app.all("*", catchUnmatchedRequestAndRedirectEncoded);

// Start server
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});