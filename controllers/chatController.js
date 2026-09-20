import OpenAI from "openai";
import dotenv from "dotenv";

import { botData } from "../data/index.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatSubmit = async (req, res) => {
  try {
    const { messages, bot } = req.body;

    const aiMessages = [
      {
        role: "system",
        content: botData.find((name) => name.botName === bot)?.personality,
      },
      ...messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: aiMessages,
    });

    console.log("Personality:", bot);
    console.log("Received messages:", aiMessages);

    res.send(response.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
