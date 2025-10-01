import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration - PUT THIS BEFORE OTHER MIDDLEWARE
app.use(cors({
    origin: "http://localhost:5173",
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

connectDB().then(() => {
    app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
    });
});