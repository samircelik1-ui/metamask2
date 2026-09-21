export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { message } = req.body || {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Messaggio demo mancante"
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({
        error: "Variabili Telegram non configurate"
      });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Demo message:\n\n${message}`
        })
      }
    );

    const telegramData = await telegramResponse.json();

if (!telegramResponse.ok || !telegramData.ok) {
  console.error("Telegram error:", {
    status: telegramResponse.status,
    response: telegramData
  });

  return res.status(502).json({
    error: "Telegram error",
    details: telegramData.description || "Errore sconosciuto"
  });
}

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Errore interno del server"
    });
  }
}