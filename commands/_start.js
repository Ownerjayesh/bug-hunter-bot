/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var url = WebApp.getUrl({
  command: "game"
})

Api.sendMessage({
  text: "🚀 Play *BB Bug Hunter*! 🎮\n\nKill the bugs before they overrun the area! This game is super fun and unique, with awesome features like:\n\n- Change the background 🌄\n- Toggle haptic feedback and background music 🎵\n- Pause the game ⏸️\n\nPlus, the game shows ads when pausing or game overing, helping the developer earn money. 💰\n\nClick below to open the game and start hunting bugs! 🐞",
  parse_mode: "markdown",
  reply_markup: {
    inline_keyboard: [[{ text: "Open the game", web_app: { url: url } }]]
  }
})

