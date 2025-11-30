export default async function handler(req, res) {
  try {
    const { city, lat, lon } = req.query;
    const API_KEY = process.env.IQAIR_API_KEY;
    const BASE = process.env.IQAIR_BASE_URL || "https://api.airvisual.com/v2";

    if (!API_KEY) {
      return res.status(500).json({ error: "IQAIR key not configured" });
    }

    let url;
    if (city) {
      url = `${BASE}/city?city=${encodeURIComponent(city)}&key=${API_KEY}`;
    } else if (lat && lon) {
      url = `${BASE}/nearest_city?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&key=${API_KEY}`;
    } else {
      return res.status(400).json({ error: "Supply `city` or `lat` and `lon`" });
    }

    const r = await fetch(url);
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("IQAir proxy error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}