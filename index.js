const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const enforce = require("express-sslify");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(limiter);
app.set("trust proxy", 1);
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("X-Forwarded-Host", req.hostname);
  next();
});
if (process.env.NODE_ENV === "development") {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(
  "/",
  createProxyMiddleware({
    target: process.env.API_BASE_URL || "https://stu.dpedu.online", // Replace with your actual API server URL
    changeOrigin: true,
  })
);
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
