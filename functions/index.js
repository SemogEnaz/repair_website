const { onRequest } = require("firebase-functions/v2/https");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// checks origin location as middle ware
const allowedOrigins = [
  "https://iphonerepairclayton.com",
  "http://localhost:5173",
  "https://repair-website-zczp.onrender.com",
];

function withRequestSecurity(handler) {
  return async (req, res) => {
    try {
      const origin = req.headers.origin;

      // Allow browser preflight request
      if (req.method === "OPTIONS") {
        if (allowedOrigins.includes(origin)) {
          res.set("Access-Control-Allow-Origin", origin);
          res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");
          return res.status(204).send("");
        }

        return res.status(403).send("Forbidden");
      }

      // Block requests from unknown frontend origins
      if (!allowedOrigins.includes(origin)) {
        return res.status(403).send("Forbidden");
      }

      // Set CORS header for allowed origins
      res.set("Access-Control-Allow-Origin", origin);

      // Make sure request is only coming from our frontend or trusted sources
      const secret = req.headers["x-api-key"];

      if (secret !== process.env.FUNCTION_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      return handler(req, res);
    } catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.message });
    }
  }
}

async function sendMessage(message) {
  if (!botToken || !chatId) {
    throw new Error("Telegram is not configured");
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  const responseText = await response.text();
  let responseBody = null;

  try {
    responseBody = JSON.parse(responseText);
  } catch {
    responseBody = null;
  }

  if (!response.ok || responseBody?.ok === false) {
    throw new Error("Telegram message failed");
  }
}

exports.sendRepairRequest = onRequest({ cors: true }, withRequestSecurity(async (req, res) => {
  try {

    let { model, services, phone, price } = req.body || {};
	price = Number(price) || 0;

    // Basic validation & early returns
    if (!model || !Array.isArray(services) || services.length === 0) return res.status(400).json({ success: false, error: "Invalid request" });
    if (!phone) return res.status(400).json({ success: false, error: "Contact required" });

    const message = `\
🔧 New Repair Request

📱 Model: ${model || "Unknown"}
🛠 Services: ${Array.isArray(services) ? services.join(", ") : "None"}
💰 Price: $${price?.toFixed(2) || "0.00"}

📞 Phone: ${phone || "N/A"}

🗓️ Date Created: ${new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Melbourne" })}
⏰ Time Created: ${new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne" })}`;

    await sendMessage(message)

    res.status(200).json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Unable to send repair request" });
  }})
);

exports.doorChime = onRequest({ cors: true }, withRequestSecurity(async (req, res) => {
    return res.status(200).json({
      message: "Door chime sent"
    })
}))
