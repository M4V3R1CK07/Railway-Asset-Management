import express from "express";
const app = express();
// Built-in middleware
app.use(express.json());
// Health Check Route
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "🚆 Railway Asset Management API is running",
    });
});
export default app;
//# sourceMappingURL=app.js.map