const test = (bot) => {
  return (ctx) => {
    console.log(ctx.message);
    bot.telegram.sendMediaGroup(-1001283790862, [
      {
        type: "photo",
        media:
          "https://upload.wikimedia.org/wikipedia/commons/b/b5/IMG-20190601-WA0004.jpg",
        caption: ctx.message.text.replace("/send ", ""),
      },
      {
        type: "photo",
        media: "https://tinypng.com/images/social/website.jpg",
      },
    ]);
  };
};

module.exports = (bot) => {
  bot.newCommand({ command: "send", description: "отправить" }, test(bot));
};
