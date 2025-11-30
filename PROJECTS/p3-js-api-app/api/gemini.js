export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    const BASE_URL = process.env.GEMINI_BASE_URL;

    if (!API_KEY || !BASE_URL) {
      return res.status(500).json({ error: "Gemini config not set" });
    }

    // Gemini requires ?key=API_KEY in the URL, not a Bearer token
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (err) {
    console.error("Gemini proxy error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}