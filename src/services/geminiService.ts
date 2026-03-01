import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFinancialInsights(transactions: Transaction[], balance: number) {
  const prompt = `
    As a financial advisor for a payment app called Sukyamrepo, analyze the following transactions and current balance.
    Provide 3 concise, actionable financial insights or tips.
    
    Current Balance: ${balance}
    Recent Transactions: ${JSON.stringify(transactions.slice(0, 5))}
    
    Return the response in JSON format matching this schema:
    {
      "insights": [
        {
          "title": "string",
          "description": "string",
          "type": "warning" | "tip" | "positive"
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash-latest",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text).insights;
    }
    return [];
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [
      {
        title: "Welcome to Sukyamrepo",
        description: "Start tracking your expenses to get personalized AI insights.",
        type: "tip"
      }
    ];
  }
}
