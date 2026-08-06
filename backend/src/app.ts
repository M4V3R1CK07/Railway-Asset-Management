import express, { Express } from "express";
import locationRoutes from "./routes/location.routes.js";


const app: Express = express();

// Built-in middleware
app.use(express.json());

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚆 Railway Asset Management API is running",
  });
});

app.use("/api/v1/locations", locationRoutes);


export default app;