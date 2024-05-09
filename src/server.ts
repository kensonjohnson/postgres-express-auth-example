import express from "express";
import { configurePassport } from "./controllers/passport/passport.js";
import { PORT, WEBSITE_URL } from "./constants.js";

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
import listRouter from "./routes/list.js";
import taskRouter from "./routes/task.js";
import { ensureAuthenticated } from "./controllers/auth-controller.js";
import { catchUnmatchedRequestAndRedirectEncoded } from "./controllers/root-controller.js";

// app.use("/", rootRouter); // serve static files
app.use("/auth", authRouter);
app.use("/user", ensureAuthenticated, userController);
app.use("/list", ensureAuthenticated, listRouter);
app.use("/task", ensureAuthenticated, taskRouter);
app.all("*", catchUnmatchedRequestAndRedirectEncoded);

// Start server
app.listen(PORT, () => console.log(`Server is running at ${WEBSITE_URL}`));
