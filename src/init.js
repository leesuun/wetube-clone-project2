import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./app";

console.log(process.env.DB_URL);
const PORT = process.env.DB_URL || 4001;

app.listen(PORT, () => {
    console.log(`✅Server listening on PORT http://localhost:${PORT}`);
});
