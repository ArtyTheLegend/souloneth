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
You are an emotional intelligence model. Given a user's spoken reflection, return ONLY a raw JSON object with the following trait scores from 0 to 1:

- reflective
- melancholic
- playful
- chaotic
- angry
- curious
- hopeful

Respond with nothing but a parsable JSON block like:
{ "reflective": 0.81, "chaotic": 0.18, ... }

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
    } catch (innerErr) {
      console.warn("GPT returned invalid JSON. Using fallback traits.");
      traits = {
        reflective: 0.4,
        melancholic: 0.4,
        chaotic: 0.2
      };
    }

    return res.status(200).json({ traits });
  } catch (err) {
    console.error("OpenAI API Error:", err.message);
    return res.status(200).json({
      traits: {
        reflective: 0.3,
        curious: 0.3,
        chaotic: 0.4
      },
      fallback: true,
      note: "OpenAI failed. Returned hard fallback."
    });
  }
}