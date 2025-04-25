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
You are an emotional intelligence model. Given a user's spoken reflection, return a JSON object with trait scores from 0 to 1.

Traits:
- reflective
- melancholic
- playful
- chaotic
- angry
- curious
- hopeful

Example output:
{ "reflective": 0.91, "chaotic": 0.13 }

Respond with only the JSON object and nothing else.

Input:
"${transcript}"
`;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    const responseText = completion.data.choices[0].message.content.trim();
    const match = responseText.match(/\{[^}]+\}/gs);
    if (!match || !match[0]) {
      return res.status(200).json({
        traits: {
          reflective: 0.5,
          melancholic: 0.5,
          playful: 0.5,
          chaotic: 0.5,
          angry: 0.5,
          curious: 0.5,
          hopeful: 0.5
        },
        fallback: true,
        note: "GPT output was not valid JSON. Returned fallback values."
      });
    }

    const traits = JSON.parse(match[0]);
    return res.status(200).json({ traits });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    return res.status(500).json({
      error: "Trait analysis failed",
      details: err.message,
      fallback: true,
      traits: {
        reflective: 0.33,
        melancholic: 0.33,
        chaotic: 0.33
      }
    });
  }
}