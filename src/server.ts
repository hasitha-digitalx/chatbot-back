import express from "express";
import translate = require("translate-google"); // note: `=` syntax because of `export = translate`

import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text, to } = req.body;

  if (!text || !to) return res.status(400).json({ error: "Missing text or target language" });

  try {
    const translated = await translate(text, { to });
    res.json({ translated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Translation failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
