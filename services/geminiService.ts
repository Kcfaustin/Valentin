
import { GoogleGenAI } from "@google/genai";

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
      contents: `Écris un poème très court (4 lignes) et extrêmement romantique pour ${name}. Elle vient de dire OUI pour être ma Valentine.`,
      config: {
        systemInstruction: "Tu es un poète romantique. Tu ne dois répondre QUE par les vers du poème. INTERDICTION d'ajouter une introduction (ex: 'Voici un poème'), un titre, des guillemets ou des commentaires avant ou après le poème. Le texte doit être pur et prêt à être lu.",
        temperature: 0.8,
      },
    });

    // Nettoyage supplémentaire au cas où le modèle ignorerait l'instruction
    let text = response.text || "";
    text = text.replace(/^(Voici|Voici une proposition|Poème|Pour|Message).*?:/i, "").trim();
    text = text.replace(/^"|"$/g, "").trim(); // Enlever les guillemets éventuels

    return text || "Tu es mon plus beau cadeau.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Roses sont rouges, les violettes sont bleues,\nÀ tes côtés, je suis le plus heureux !";
  }
}
