const { checkMethod } = require("../utils");
const fs = require("fs");
const models = require("../db/models");
const { HasMany, HasOne } = require("sequelize");
const { Markup } = require("telegraf");

let model = models["post"];

const readMedia = async (id) => {
  let result = [];
  const data = await model.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt", "brandId"],
    },
    include: [
      {
        model: models.brand,
        as: "brand",
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
      },
      {
        association: new HasMany(model, models.media, {}),
        required: false,
        attributes: {
          exclude: ["createdAt", "updatedAt", "deletedAt", "postId"],
        },
      },
      {
        association: new HasOne(model, models.price, {}),
        required: false,
        attributes: {
          exclude: [
            "goodId",
            "id",
            "description",
            "purchase",
            "createdAt",
            "updatedAt",
            "deletedAt",
          ],
        },
      },
    ],
    where: { id },
  });
  data.media.forEach((item) => {
    const file = `${__dirname}\\..\\..\\media\\${item.path}`;
    if (fs.existsSync(file)) {
      result.push({
        type: item.isVideo ? "video" : "photo",
        media: { source: file },
      });
    }
  });
  if (result.length > 0) {
    result[0].caption = `${
      data.brand?.caption ? `🛍Бренд "${data.brand.caption}"` : ""
    } 

${data.price?.sale ? `💶 Retail Price: ${data.price.sale}€` : ""}
${data.price?.discount ? `💶 Цена со скидкой: ${data.price.discount}€` : ""}

___________________________________________
💌Для заказа или по вопросам пишите  сюда ➡️ @Olga_St90 `;
  }
  return result;
};

const post = (bot) => {
  return async (req, res) => {
    const { id } = req.body;
    if (id) {
      bot.telegram
        .sendMediaGroup(-1001283790862, await readMedia(id))
        .then((post) => {
          // bot.telegram.editMessageCaption(
          //   -1001283790862,
          //   post[0].message_id,
          //   undefined,
          //   "text",
          //   Markup.inlineKeyboard([
          //     Markup.button.url(
          //       "Купи что нибудь",
          //       `https://t.me/joinchat/PlhQ2-HUVmczODli`
          //     ),
          //   ])
          // );
          res.status(200).send({
            send: post.map((item) => ({
              id: item.message_id,
              mediaId: item.media_group_id,
            })),
          });
        });
    } else {
      throw new Error("Not found id in body");
    }
  };
};

module.exports = (router, moduleName, bot) => {
  router.post("/", checkMethod(post(bot), moduleName));
};
