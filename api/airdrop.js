export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, source, timestamp } = req.body;

  if (!email || !source || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const response = await fetch("https://api.airtable.com/v0/app2NkPC5K0JngQtj/Leads", {
      method: "POST",
      headers: {
        Authorization: "Bearer patHJ9e40Krzpml28.b244f9a9eb29f4e3e6df6c3ee79ba5891f1ea71c06befc1b0fa5e81e72079ad6",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              email,
              source,
              timestamp
            }
          }
        ]
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Airtable error:", text);
      return res.status(500).json({ error: "Airtable request failed", details: text });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}