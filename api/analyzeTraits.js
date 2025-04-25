import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6
    });

    const raw = completion.choices[0].message.content.trim();
    let traits;

    try {
      traits = JSON.parse(raw);
    } catch {
      traits = {
        reflective: 0.4,
        melancholic: 0.3,
        hopeful: 0.3
      };
    }

    return res.status(200).json({ traits });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    return res.status(200).json({
      traits: {
        reflective: 0.4,
        chaotic: 0.3,
        curious: 0.3
      },
      fallback: true,
      note: "OpenAI failed. Returning fallback traits."
    });
  }
}