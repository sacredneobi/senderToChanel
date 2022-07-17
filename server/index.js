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

bot.telegram.setMyCommands(commands);

bot.use((ctx, next) => {
  console.log(ctx.update);
  next();
});

bot.launch();
app.listen(4000);
