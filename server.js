// Importing modules the ESM way
import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

// Required to emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App setup
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from /public

// Route to get a random Bible verse
app.get("/api/verse", async (req, res) => {
  try {
    const response = await fetch("https://bible-api.com/?random=verse");

    if (!response.ok) {
      return res.status(response.status).json({ error: "Bible API failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("API fetch error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
