import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./app";

const PORT = process.env.port || process.env.PORT || 4001;

app.listen(PORT, () => {
    console.log(`✅Server listening on PORT http://localhost:${PORT}`);
});
