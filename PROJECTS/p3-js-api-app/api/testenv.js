export default function handler(req, res) {
  res.status(200).json({
    IQAIR_API_KEY: process.env.IQAIR_API_KEY || "❌ missing",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "❌ missing",
    IPINFO_TOKEN: process.env.IPINFO_TOKEN || "❌ missing"
  });
}