const TelegramBot = require("node-telegram-bot-api");
const fetch = require("node-fetch");

const TOKEN = "8272069185:AAE_7oA_wregGCCq60LgZpClC_UImGSS4kk";
const CHAT_ID = "7817169469";
const WALLET = "2aGv8XGXqtuJFiRzMaULmcZ6juaDpDfFPRS6t6YpZP7F";

const bot = new TelegramBot(TOKEN, { polling: true });

async function claimFaucet() {
  try {
    const res = await fetch("https://faucet.fogo.io/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ address: WALLET })
    });

    const data = await res.json();
    const msg = data?.message || JSON.stringify(data);
    bot.sendMessage(CHAT_ID, `✅ Claim result: ${msg}`);
  } catch (err) {
    bot.sendMessage(CHAT_ID, `❌ Error: ${err.message}`);
  }
}

// auto claim tiap 1 menit
setInterval(claimFaucet, 60 * 1000);

// balasan jika ada chat masuk
bot.on("message", (msg) => {
  if (msg.text.toLowerCase() === "/claim") {
    claimFaucet();
  } else {
    bot.sendMessage(msg.chat.id, "⏳ Auto-claim sedang berjalan tiap 1 menit.");
  }
});
