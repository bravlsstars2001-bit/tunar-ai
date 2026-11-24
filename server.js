
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Mesaj daxil edin."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Hazırda cavab almaq mümkün olmadı."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Tunar AI işləyir: ${PORT}`);
});
