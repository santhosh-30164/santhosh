
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getClient = () => {
  let apiKey = 'AIzaSyDAwIN0sMMY4BH-TYqZdAyNdLVT2SkYL-4';
  
  try {
    // Safely check for environment variable without causing ReferenceError in browser
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      apiKey = process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error if process is not defined in the environment
  }
  
  if (!apiKey) {
    console.error("API_KEY is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = () => {
  try {
    const client = getClient();
    if (!client) return null;

    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, 
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!chatSession) {
      initializeChat();
    }

    if (!chatSession) {
      return "SYSTEM ERROR: Secure link to Tactical AI could not be established. Check API Configuration.";
    }

    const response: GenerateContentResponse = await chatSession.sendMessage({
      message: message
    });
    return response.text || "SYSTEM ALERT: Empty response received from headquarters.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Include error details in the UI message for easier debugging
    const errorDetail = error?.message || String(error);
    return `CONNECTION LOST: Unable to reach Tactical Command. [${errorDetail}] Please retry.`;
  }
};
