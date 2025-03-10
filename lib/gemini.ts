import environment from "@/config/environment";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(environment.GEMINI_API_KEY!);

export async function getAiSuggestions(userInput: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `
      You are a digital video assistant working for services like Netflix, Disney Plus & Amazon Prime Video. 
      Your job is to provide suggestions based on the videos the user specifies. 
      Provide a quirky breakdown of what the user should watch next. 
      It should only list the names of the films after the introduction. 
      
      Keep the response short and sweet! Always list at least 3 films as suggestions. 
      If the user mentions a genre, you should provide a suggestion based on that genre. 
      
      **Format the output as a numbered list (1, 2, 3, ...) without any bold text or bullet points.**
    `,
  });

  const result = await model.generateContent(userInput);
  return result.response.text();
}
