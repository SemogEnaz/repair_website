const { onRequest } = require("firebase-functions/v2/https");
require("dotenv").config();

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

exports.sendRepairRequest = onRequest(
  {
    cors: true, // ✅ BUILT-IN CORS (no package needed)
  },
  async (req, res) => {
    try {

      // Only allow requests from the correct origin (my frontend domain)
      const allowedOrigins = ["https://iphonerepairclayton.com", "http://localhost:5173", "https://repair-website-zczp.onrender.com/"];
      const origin = req.headers.origin;
      if (!allowedOrigins.includes(origin)) {
        return res.status(403).send("Forbidden");
      }

      //console.log("HEADER KEY:", req.headers["x-api-key"]);
      //console.log("ENV KEY:", process.env.FUNCTION_SECRET);

      // Make sure request is only coming from our frontend (or trusted sources)
      const secret = req.headers["x-api-key"];
      if (secret !== process.env.FUNCTION_SECRET) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const { model, services, phone, email, price } = req.body || {};

      // Basic validation & early returns
      if (!model || !Array.isArray(services) || services.length === 0) return res.status(400).json({ error: "Invalid request" });
      if (!phone && !email) return res.status(400).json({ error: "Contact required" });

      console.log("Received data:", { model, services, phone, email, price });

      const message = `\
🔧 New Repair Request

📱 Model: ${model || "Unknown"}
🛠 Services: ${Array.isArray(services) ? services.join(", ") : "None"}
💰 Price: $${price?.toFixed(2) || "0.00"}

📞 Phone: ${phone || "N/A"}
📧 Email: ${email || "N/A"}

🗓️ Date Created: ${new Date().toLocaleDateString("en-AU", { timeZone: "Australia/Melbourne" })}
⏰ Time Created: ${new Date().toLocaleTimeString("en-AU", { timeZone: "Australia/Melbourne" })}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });

      res.status(200).json({ success: true });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);
