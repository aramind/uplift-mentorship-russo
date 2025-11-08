export default function handler(req, res) {
  return res.status(200).json({
    NODE_ENV: process.env.NODE_ENV,
    IQAIR_API_KEY: process.env.IQAIR_API_KEY || '❌ missing',
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || '❌ missing',
    IPINFO_TOKEN: process.env.IPINFO_TOKEN || '❌ missing',
  });
}