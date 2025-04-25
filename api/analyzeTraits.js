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
You are an emotional intelligence model. Given a user’s spoken reflection, return a set of trait scores from 0 to 1.

Traits to evaluate:
- reflective
- melancholic
- playful
- chaotic
- angry
- curious
- hopeful

Return ONLY a JSON object like:
{ "reflective": 0.92, "chaotic": 0.33, ... }

Input:
"${transcript}"
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    const jsonBlock = completion.data.choices[0].message.content.trim();
    const traits = JSON.parse(jsonBlock);

    return res.status(200).json({ traits });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    return res.status(500).json({ error: "Trait analysis failed", details: err.message });
  }
}