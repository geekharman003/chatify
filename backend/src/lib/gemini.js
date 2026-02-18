import { GoogleGenAI } from "@google/genai";
import { ENV } from "./env.js";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

export async function main(message) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `"${message}": generate 3 auto suggestions based on this message.keep it short and to the point.don't include counting,asterisks in the response`,
  });

  // Extract all candidate texts into an array
  const responsesArray = response.candidates
    .map((candidate) => candidate.content.parts[0].text)[0]
    .split("\n")
    .map((response) => response.trim());

  return responsesArray;
}
