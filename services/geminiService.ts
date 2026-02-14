import { GoogleGenAI } from "@google/genai";

export async function generateValentinePoem(name: string, isRecipientFeminine: boolean): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Si le destinataire est une femme (Valentine), l'auteur est un homme (Masculin)
    // Si le destinataire est un homme (Valentin), l'auteur est une femme (Féminin)
    const senderPerspective = isRecipientFeminine ? "un homme amoureux (accords masculins)" : "une femme amoureuse (accords féminins)";
    const recipientGender = isRecipientFeminine ? "féminin (Valentine)" : "masculin (Valentin)";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Écris un poème très court (4 lignes) pour ${name}. 
      IMPORTANT : Le destinataire est ${recipientGender}. 
      TU DOIS impérativement écrire du point de vue d'${senderPerspective}. 
      Par exemple, si tu es une femme écrivant à un homme, utilise "je suis heureuse".`,
      config: {
        systemInstruction: `Tu es un poète romantique. 
        Si tu écris à un homme (Valentin), tu es une femme : utilise le féminin pour toi-même (ex: heureuse, comblée). 
        Si tu écris à une femme (Valentine), tu es un homme : utilise le masculin pour toi-même (ex: heureux, comblé). 
        Réponds UNIQUEMENT par les 4 vers du poème, sans rien d'autre.`,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    let text = response.text || "";
    text = text.replace(/^(Voici|Voici une proposition|Poème|Pour|Message).*?:/i, "").trim();
    text = text.replace(/^"|"$/g, "").trim();

    return text || "Tu es mon plus beau cadeau.";
  } catch (error) {
    console.error("Gemini Error:", error);
    const fallback = isRecipientFeminine 
      ? `Ma chère ${name},\nDans tes yeux je vois mon bonheur,\nTu es la gardienne de mon cœur.\nJe suis si heureux que tu aies dit oui !`
      : `Mon cher ${name},\nTon sourire est ma plus belle fleur,\nTu es le gardien de mon bonheur.\nJe suis si heureuse que tu aies dit oui !`;
    return fallback;
  }
}