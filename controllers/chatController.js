import OpenAI from "openai";
import dotenv from "dotenv";

import { botData } from "../data/index.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatSubmit = async (req, res) => {
  try {
    const { message, characterId, userName, history = [] } = req.body;

    const selectedBot = botData.find((bot) => bot.id === characterId);

    const conversationHistory = history.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: selectedBot.personality,
        },
        ...conversationHistory,
        {
          role: "user",
          content: `The user's name is ${userName}. They said: ${message}`,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({
      message: "Chat response generated",
      response: aiResponse,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
