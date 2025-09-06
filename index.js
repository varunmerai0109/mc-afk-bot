
const mineflayer = require("mineflayer");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Simple web server so Northflank keeps it alive
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(port, () => console.log(`Web server running on port ${port}`));

function createBot() {
  const bot = mineflayer.createBot({
    host: "elvonsmp.falixsrv.me", // your server IP
    port: 25565,                  // your server port
    username: "AFKBot",           // bot username
    version: "1.21.8",            // your server version
    auth: "offline"               // change to "microsoft" if premium
  });

  bot.on("spawn", () => {
    console.log("Bot has spawned and is online!");
  });

  bot.on("end", () => {
    console.log("Bot disconnected. Reconnecting...");
    setTimeout(createBot, 5000); // reconnect after 5s
  });

  bot.on("error", err => {
    console.log("Error:", err);
  });
}

createBot();
