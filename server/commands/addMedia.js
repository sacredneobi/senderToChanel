const fs = require("fs");

const defBn = (ctx) => {
  addMediaToFile(
    ctx.update.message.from.id,
    "brand",
    ctx.message.text.replace("/bn ", ""),
    ctx
  );
};

const defPr = (ctx) => {
  addMediaToFile(
    ctx.update.message.from.id,
    "price",
    ctx.message.text.replace("/pr ", "") + "€",
    ctx
  );
};

const defPrd = (ctx) => {
  addMediaToFile(
    ctx.update.message.from.id,
    "priceDiscount",
    ctx.message.text.replace("/prd ", "") + "€",
    ctx
  );
};

const addMediaToFile = (id, type, media, ctx, isArray = false) => {
  const file = `../../tmp/${id}.post`;
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(file);
    try {
      const obj = JSON.parse(data);
      if (isArray) {
        if (obj[type]) {
          obj[type].push(media);
        } else {
          obj[type] = [media];
        }
      } else {
        obj[type] = media;
      }
      fs.writeFileSync(file, JSON.stringify(obj, null, 2));
    } catch (err) {
      ctx.reply(`Ошибка:${err.message}`);
    }
  } else {
    ctx.reply(`Ошибка: Нужно сначала создать пост /new`);
  }
};

module.exports = (bot) => {
  bot.newCommand(
    { command: "bn", description: "Добавить бренд, написать /bn Balenciaga" },
    defBn
  );

  bot.newCommand(
    { command: "pr", description: "Добавить цену, написать /pr 1200" },
    defPr
  );

  bot.newCommand(
    {
      command: "prd",
      description: "Добавить цену со скидкой, написать /prd 1200",
    },
    defPrd
  );

  bot.on("photo", (ctx, next) => {
    addMediaToFile(
      ctx.update.message.from.id,
      "photo",
      ctx.update.message.photo[ctx.update.message.photo.length - 1].file_id,
      ctx,
      true
    );
  });
  bot.on("video", (ctx, next) => {
    addMediaToFile(
      ctx.update.message.from.id,
      "video",
      ctx.update.message.video.file_id,
      ctx,
      true
    );
  });
};
