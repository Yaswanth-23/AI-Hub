import ollama from "ollama";

export const generateOllamaResponse = async (prompt, model) => {
  try {
    const response = await ollama.chat({
      model: model || "gemma3:1b",
      messages: [{ role: "user", content: prompt }],
    });

    return response.message.content;
  } catch (error) {
    console.error("Ollama Error:", error);
    throw new Error("AI generation failed");
  }
};