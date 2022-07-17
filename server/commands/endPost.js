const fs = require("fs");

const readMedia = (file, ctx) => {
  let media = [];
  try {
    const data = fs.readFileSync(file, "utf8");
    const obj = JSON.parse(data);
    if (obj.video) {
      obj.video.forEach((video) => media.push({ type: "video", media: video }));
    }
    if (obj.photo) {
      obj.photo.forEach((photo) => media.push({ type: "photo", media: photo }));
    }

    if (media.length > 0) {
      media[0].caption = `${obj.brand ? `🛍Бренд ${obj.brand}` : ""} 

${obj.price ? `💶 Retail Price: ${obj.price}` : ""}
${obj.priceDiscount ? `💶 Цена со скидкой: ${obj.priceDiscount}` : ""}

___________________________________________
💌Для заказа или по вопросам пишите  сюда ➡️ @Olga_St90 `;
    }
    return media;
  } catch (e) {
    ctx.reply(`Ошибка: ${err.message}`);
  }
};

const def = (bot) => {
  return (ctx) => {
    const file = `../../tmp/${ctx.message.from.id}.post`;
    if (fs.existsSync(file)) {
      bot.telegram
        .sendMediaGroup(ctx.message.from.id, readMedia(file, ctx))
        .then(() => {
          fs.unlinkSync(file);
        });
    }
  };
};

module.exports = (bot) => {
  bot.newCommand(
    { command: "end", description: "Закончить редактирование" },
    def(bot)
  );
};
