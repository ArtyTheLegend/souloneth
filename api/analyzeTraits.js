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
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6
      })
    });

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || "";

    let traits;
    try {
      traits = JSON.parse(raw);
    } catch (err) {
      console.warn("GPT parse failed. Returning fallback traits.");
      traits = {
        reflective: 0.4,
        melancholic: 0.3,
        hopeful: 0.3
      };
    }

    return res.status(200).json({ traits });
  } catch (err) {
    console.error("analyzeTraits fallback error:", err.message);
    return res.status(200).json({
      traits: {
        reflective: 0.3,
        curious: 0.3,
        chaotic: 0.4
      },
      fallback: true,
      note: "Fallback traits used due to OpenAI API failure."
    });
  }
}