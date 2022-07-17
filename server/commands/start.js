const def = async (ctx) => {
  ctx.reply("Привет");
};

module.exports = (bot) => {
  bot.start(def);
};
