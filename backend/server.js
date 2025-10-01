import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - PUT THIS BEFORE OTHER MIDDLEWARE
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? "https://mern-thinkboard-ods7.onrender.com" 
        : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
// app.use(rateLimiter);  // Keep disabled for now

app.use((req, res, next) => {
    console.log(`req method is ${req.method} and req URL is ${req.url}`);
    next();
});

app.use("/api/notes", notesRoutes);

// Serve static files from frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Catch-all handler for SPA
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    });
});