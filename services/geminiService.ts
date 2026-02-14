
import { GoogleGenAI } from "@google/genai";

// On récupère la clé. Si elle n'est pas définie, on évite de faire planter l'app.
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

export async function generateValentinePoem(name: string): Promise<string> {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.warn("API_KEY non trouvée. Utilisation du poème par défaut.");
    return `Ma chère ${name},\n\nDes roses pour ton sourire,\nDes mots pour te dire,\nQue mon cœur ne veut que toi,\nPour aujourd'hui et pour la vie.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Écris un poème très court (4-6 lignes) et extrêmement romantique pour ${name} qui vient de dire OUI pour être ma Valentine. En français.`,
      config: {
        temperature: 0.8,
      },
    });

    return response.text || "Tu es mon plus beau cadeau.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Roses sont rouges, les violettes sont bleues,\nÀ tes côtés, je suis le plus heureux !";
  }
}
