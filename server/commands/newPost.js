const fs = require("fs");

const empty = { dataTime: undefined };

const def = (bot) => {
  return (ctx) => {
    empty.dataTime = Date.now();
    fs.writeFileSync(
      `../../tmp/${ctx.message.chat.id}.post`,
      JSON.stringify(empty, null, 2),
      {
        encoding: "utf8",
      }
    );
    ctx.reply("Выберите команду для добавления материалов");
  };
};

module.exports = (bot) => {
  bot.newCommand(
    { command: "new", description: "Создать новый пост" },
    def(bot)
  );
};
