// src/services/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function identifyTrash(imageFile) {
  try {
    // Convert image to Base64
    const base64Data = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(imageFile);
    });

    const prompt = `
      Analyze this trash item.
      1. Is it RECYCLABLE in Singapore? (Boolean).
      2. What is the item name? (Short string).
      3. Why? (Short 1-sentence reason).
      4. Return ONLY JSON: { "isRecyclable": true, "itemName": "Plastic Bottle", "reason": "It is clean PET plastic." }
    `;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Data, mimeType: imageFile.type } }
    ]);
    
    const text = result.response.text().replace(/```json|```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Scan Error:", error);
    return null; 
  }
}
