import { GoogleGenAI } from "@google/genai";
import { EquipmentData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert HVAC and Plumbing Service Agent. Your job is to analyze photos of equipment data plates (AC units, water heaters, furnaces) and perform "Triage" for business owners.

Steps:
1.  **Vision Analysis**: Analyze ALL provided images. Combine information from multiple angles if available (e.g., if one photo has the model and another has the serial). Extract Brand, Model Number, and Serial Number.
2.  **Research (Grounding)**: Use Google Search to:
    *   Decode the serial number to find the Date of Manufacture.
    *   Find the standard warranty terms for that specific brand and equipment generation from that year.
    *   Find a URL for the Installation or Service Manual.
3.  **Calculation**: Calculate the equipment age in years (assume current year is 2025).
4.  **Triage**:
    *   If Age > 12 years OR Warranty is Expired: Recommend "Replace" or "Consult".
    *   If Age < 10 years AND Warranty is Active: Recommend "Repair".
5.  **Cost Analysis**:
    *   Estimate a typical major repair cost for this age of unit (e.g., $600-$1500).
    *   Estimate the revenue opportunity for a replacement (e.g., $8,000-$15,000).
    *   Truck roll cost is always approx $150.

Output Requirements:
*   You must return a raw JSON object.
*   Do not include markdown formatting (like \`\`\`json).
*   The JSON must match the following structure exactly:
    {
      "brand": "string",
      "modelNumber": "string",
      "serialNumber": "string",
      "manufactureDate": "string",
      "ageYears": number,
      "warrantyStatus": "Active" | "Expired" | "Unknown",
      "warrantyNotes": "string",
      "manualUrl": "string (valid URL or null)",
      "recommendation": "Repair" | "Replace" | "Consult",
      "recommendationReason": "string",
      "costAnalysis": {
        "estimatedRepairCost": number,
        "replacementOpportunity": number,
        "savedTruckRollCost": number
      }
    }
`;

/**
 * Converts a File object to a base64 string suitable for the Gemini API.
 */
const fileToPart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        const base64Data = reader.result.split(',')[1];
        resolve({
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        });
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeEquipmentImage = async (files: File[]): Promise<EquipmentData> => {
  try {
    // Convert all files to Gemini parts
    const imageParts = await Promise.all(files.map(fileToPart));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          ...imageParts,
          {
            text: "Analyze these equipment photos. If multiple photos are provided, combine the data. Decode the serial number using online resources to find the age. Check warranty status. Provide a triage recommendation.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        temperature: 0.2, 
      },
    });

    let text = response.text || "";

    // Cleanup: Remove markdown code blocks if present
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parse JSON
    try {
      const data: EquipmentData = JSON.parse(text);
      return data;
    } catch (parseError) {
      console.error("JSON Parse Error", parseError);
      console.error("Raw Text:", text);
      throw new Error("Failed to parse AI response. The agent might have failed to retrieve structured data.");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};