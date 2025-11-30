export default async function handler(req, res) {
  try {
    const token = process.env.IPINFO_TOKEN;
    const BASE = process.env.IPINFO_BASE_URL || "https://ipinfo.io/json";

    if (!token) {
      return res.status(500).json({ error: "IPINFO token not configured" });
    }

    const url = `${BASE}?token=${token}`;
    const r = await fetch(url);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("IPInfo proxy error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}