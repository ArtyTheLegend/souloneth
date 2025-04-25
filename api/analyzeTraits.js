import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { transcript } = req.body;
  if (!transcript) {
    return res.status(400).json({ error: "Missing transcript" });
  }

  const prompt = `
You are an emotional intelligence model. Given a user's spoken reflection, return ONLY a JSON object with the following trait scores from 0 to 1:

- reflective
- melancholic
- playful
- chaotic
- angry
- curious
- hopeful

Example format:
{ "reflective": 0.81, "chaotic": 0.18 }

Return only the JSON. No explanation or formatting.
Input:
"${transcript}"
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    const raw = completion.data.choices[0].message.content.trim();
    let traits = null;

    try {
      traits = JSON.parse(raw);
    } catch {
      console.warn("GPT JSON parse failed. Using fallback traits.");
      traits = {
        reflective: 0.3,
        melancholic: 0.3,
        curious: 0.4
      };
    }

    return res.status(200).json({ traits });
  } catch (err) {
    console.error("OpenAI API error:", err.message);
    return res.status(200).json({
      error: "trait analysis failed",
      fallback: true,
      traits: {
        reflective: 0.4,
        chaotic: 0.3,
        hopeful: 0.3
      }
    });
  }
}