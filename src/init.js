import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
// import "./models/Comment";
import app from "./app";

const PORT = 4002;

app.listen(PORT, () => {
    console.log(`✅Server listening on PORT http://localhost:${PORT} 🚀`);
});
