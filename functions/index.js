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
      const { model, services, contact } = req.body || {};

  const message = `\
🔧 New Repair Request

📱 Model: ${model || "Unknown"}
🛠 Services: ${Array.isArray(services) ? services.join(", ") : "None"}

📞 Phone: ${contact?.phone || "N/A"}
📧 Email: ${contact?.email || "N/A"}

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
