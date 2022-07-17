require("dotenv").config();
const { Router } = require("express");
const app = require("./config/express")();
const { Telegraf } = require("telegraf");
const { loader, sleep } = require("./utils");
const { commands } = require("./utils/telegrafProto");

const bot = new Telegraf(process.env.BOT_ID);

loader({ path: "./commands", type: "Bot command" }, bot);
loader(
  { path: "./controllers", type: "Express controller" },
  bot,
  (moduleName) => {
    const router = Router();
    app.use(`/api/${moduleName}`, router);
    return router;
  }
);

// bot.telegram.sendMediaGroup(ctx.message.from.id, [
//   {
//     type: "photo",
//     media:
//       "https://upload.wikimedia.org/wikipedia/commons/b/b5/IMG-20190601-WA0004.jpg",
//     caption: ctx.message.text.replace("/send ", ""),
//   },
//   {
//     type: "photo",
//     media: "https://tinypng.com/images/social/website.jpg",
//   },
// ]);

bot.telegram.setMyCommands(commands);

bot.use((ctx, next) => {
  // console.log(ctx.update.message.photo);

  next();
});

bot.launch();
app.listen(4000);
