// server.js  (CommonJS)
const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <-- your data file
const middlewares = jsonServer.defaults();

// Allow all origins (so Vercel frontend, localhost, Postman, etc. can access)
// If you later want to restrict, replace this with an allowlist again.
server.use(
  cors({
    origin: "*", // <-- allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Default middlewares (logger, static, etc.)
server.use(middlewares);

// Root route for health check
server.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    message: "PipSuite JSON server is running",
    endpoints: ["/Users", "/Trades", "/Strategies"],
  });
});

// JSON Server routes
server.use(router);

// Start
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
