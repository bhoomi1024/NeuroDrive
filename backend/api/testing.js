// testing.js
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure correct import
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyBIHPVm6EPRrewnmqH85Z2M_mt5i7RYq3o");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generatingResult = async (prompt, image) => {
  try {
    const result = await model.generateContent([prompt, image]);
    return result.response.text(); // Return the result text
  } catch (error) {
    console.error("Error generating content:", error);
  }
};
