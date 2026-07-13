// import dns from "node:dns"; dns.setServers(["1.1.1.1", "8.8.8.8"]); // Uncomment it before running in lcoal
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.set("trust proxy", true);

app.use((req, res, next) => {
  const userAgent = req.headers["user-agent"] || "";
  const isBot =
    userAgent.includes("Uptrends") || userAgent.includes("UptimeRobot");

  // If it's the bot, ONLY let it hit the tiny health route
  if (isBot) {
    if (req.path === "/api/health") {
      return next(); // Let it through to return "OK"
    } else {
      // If the bot tries to load your HTML, CSS, or JS, destroy the connection!
      req.socket.destroy();
      return;
    }
  }

  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 🟢 HEALTH ROUTE
app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  connectDB();
});
