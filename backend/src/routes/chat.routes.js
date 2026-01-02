import express from "express";
<<<<<<< HEAD
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
=======
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

<<<<<<< HEAD
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are EduMantra AI Tutor." },
        { role: "user", content: message },
=======
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
      ],
    });

    res.json({
<<<<<<< HEAD
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI failed" });
=======
      reply: response.text,
    });
  } catch (err) {
    console.error("GEMINI ERROR =>", err.message);
    res.status(500).json({ error: err.message });
>>>>>>> 24ecf6f23405b91e129d5f45c2b14dc9e8620f84
  }
});

export default router;
