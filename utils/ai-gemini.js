
import { GoogleGenAI } from '@google/genai';

// Call Gemini API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    throw new Error('Server misconfigured: GEMINI_API_KEY is missing');
  }

  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: model,
      contents: `Dream: ${dreamText}`,
      config: {
        systemInstruction:
          'You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.'
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error('Gemini API call failed:', error.message || error);
    throw new Error(`API error: ${error.message}`);
  }
}

