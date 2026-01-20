
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIProductInsights = async (products: Product[], query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is asking: "${query}". Based on these products: ${JSON.stringify(products)}, recommend the best ones and explain why. Keep it concise and friendly.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "I couldn't get insights right now, but feel free to browse our collection!";
  }
};

export const getDashboardSummary = async (orders: any[]) => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Analyze these recent orders and provide a quick executive summary for the store owner: ${JSON.stringify(orders)}. Mention total revenue, popular trends, and one growth tip.`,
        });
        return response.text;
    } catch (error) {
        return "Executive summary unavailable.";
    }
}
