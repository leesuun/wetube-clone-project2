import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./app";

console.log("sad");
const PORT = process.env.DB_URL || 4002;

app.listen(PORT, () => {
    console.log(`✅Server listening on PORT http://localhost:${PORT} 🚀`);
});
