import express, { Express } from "express";
import locationRoutes from "./routes/location.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { notFoundHandler } from "./middlewares/notFound.middleware.js";


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

app.use(notFoundHandler);

app.use(errorHandler);


export default app;