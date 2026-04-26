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
      const { model, services, phone, email, price } = req.body || {};

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
