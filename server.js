// server.js  (CommonJS)
const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // <-- your data file
const middlewares = jsonServer.defaults();

// Allow your Vercel app + local dev (add more origins if needed)
const allowedOrigins = [
  "http://localhost:3000",
  "https://pip-suite.vercel.app/",
];

server.use(
  cors({
    origin(origin, cb) {
      // allow no-origin (curl, Postman) and listed origins
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("Not allowed by CORS"));
    },
  })
);

// Default middlewares (logger, static, etc.)
server.use(middlewares);

// Root route for health check
server.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
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
