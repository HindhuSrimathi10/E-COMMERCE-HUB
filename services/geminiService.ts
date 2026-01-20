
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIStylingTips = async (product: Product) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional luxury fashion stylist. Provide 3 short, punchy styling tips for this item: "${product.name} - ${product.description}". Focus on color pairing and occasion. Format as a bulleted list.`,
      config: {
        temperature: 0.8,
      }
    });
    return response.text;
  } catch (error) {
    return "Style with confidence and your own unique flair.";
  }
};

export const getAIProductInsights = async (products: Product[], query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is asking: "${query}". Based on these premium fashion items: ${JSON.stringify(products)}, recommend the best ones. Be sophisticated and persuasive.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "I couldn't get insights right now, but our collection speaks for itself.";
  }
};

export const getDashboardSummary = async (orders: any[]) => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: `Analyze these recent orders for a fashion hub: ${JSON.stringify(orders)}. Mention total revenue, top selling categories, and a styling trend to watch.`,
        });
        return response.text;
    } catch (error) {
        return "Executive summary unavailable.";
    }
}
