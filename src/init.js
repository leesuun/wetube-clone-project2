import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./app";

console.log("sad");
const PORT = 4002 || process.env.DB_URL;

app.listen(PORT, () => {
    console.log(`✅Server listening on PORT http://localhost:${PORT} 🚀`);
});
