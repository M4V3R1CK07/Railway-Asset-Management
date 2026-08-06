import app from "./app.js";
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log("=".repeat(55));
    console.log("🚆 Railway Asset Management API");
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log("=".repeat(55));
});
//# sourceMappingURL=server.js.map