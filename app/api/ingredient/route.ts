import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
const AI_TOKEN = process.env.GEMINI_AI_TOKEN || process.env.AI_TOKEN;
const ai = new GoogleGenAI({ apiKey: AI_TOKEN || "" });
export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();
    const { prompt } = req;
    console.log(req);
    if (!prompt) {
      return NextResponse.json(
        { error: "no prompt provided" },
        { status: 401 }
      );
    }
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents:
        "Explain how AI works in a few words, list the main ingredients of the food",
    });
    return NextResponse.json({ text: response.text });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error" },
      { status: 500 }
    );
  }
};
