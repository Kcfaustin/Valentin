
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function generateValentinePoem(name: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, beautiful, and slightly cheesy romantic poem for someone named ${name} who just said 'Yes' to being my Valentine. Keep it under 6 lines.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text || "You make my heart skip a beat,\nEvery time we meet.\nIn your eyes, I see the sun,\nMy favorite person, my number one.";
  } catch (error) {
    console.error("Gemini Poem Generation Error:", error);
    return "Roses are red, violets are blue,\nMy Valentine's Day is perfect with you!";
  }
}
