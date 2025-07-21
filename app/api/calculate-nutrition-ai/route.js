import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { ingredients } = body;
    if (!ingredients || !Array.isArray(ingredients)) {
      return new Response(JSON.stringify({ error: "Ingredients required" }), { status: 400 });
    }

    const prompt = `
     Analyze the following ingredients and extract the following information:
      1. Fiber
      2. Calories
      3. Protein 
      4. Fats
      5. Carbohydrates  
      6. Net Carbs
      7. Sodium
      8. Cholesterol
      Provide the total nutrition facts for the entire recipe.

      Format your response as a clean JSON object with these fields:
      {
        "fiber": "",
        "protein": "",
        "fats": "",
        "carbohydrates": "",
        "netCarbs": "",
        "sodium": "",
        "cholesterol": "",
        "calories":"",
        "confidence": 0.0
      }

      For confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.
      Only respond with the JSON object, nothing else.

      Ingredients:
      ${ingredients.join("\n")}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    const cleaned = rawText.replace(/```json|```/g, "").trim();

    let nutrition;
    try {
      nutrition = JSON.parse(cleaned);
    } catch (err) {
      return new Response(JSON.stringify({ error: "Failed to parse nutrition JSON from Gemini response", raw: cleaned }), { status: 500 });
    }

    return new Response(JSON.stringify(nutrition), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}