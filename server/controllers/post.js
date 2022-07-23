const models = require("../db/models");
const path = require("path");
const { checkMethod } = require("../utils");
const { HasMany, HasOne, Op } = require("sequelize");
const {
  defaultPostRouter,
  defaultDeleteRouter,
  defaultPutRouter,
  defaultHelpRouter,
} = require("../utils/db");

let model;

const get = async (req, res) => {
  const { search, id, ...other } = req.query;

  const searchCaption = search
    ? {
        [Op.or]: [
          { caption: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : null;

  const searchId = id ? { id } : null;

  const where =
    searchCaption || searchId ? { ...searchCaption, ...searchId } : null;

  res.status(200).send(
    await model.findAndCountAll({
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
      order: [["id", "DESC"]],
      where: where,
    })
  );
};

const writeFile = (file, fileName, post) => {
  return new Promise((resolve, reject) => {
    var ext = path.extname(file.name || "");
    const filePath = `${__dirname}/../../media/${fileName}`;
    file.mv(filePath, (err) => {
      if (err) reject(err);
      post(() => {
        resolve();
      }, fileName);
    });
  });
};

const post = async (req, res) => {
  let brandId = req.body.brandId;

  try {
    if (req.body.brandId_obj) {
      brandId = JSON.parse(req.body.brandId_obj);
    }
  } catch {
    brandId = req.body.brandId;
  }

  const { price = 0, discount = 0, description } = req.body;

  let brand = null;

  if (typeof brandId === "object") {
    brand = { id: brandId.id };
  } else {
    brand = await models["brand"].findOne({ where: { caption: brandId } });
    if (!brand) {
      brand = await models["brand"].create({
        caption: brandId,
        description: "Auto Create From Post",
      });
    }
  }
  const date = new Date();
  const post = await model.create({
    brandId: brand.id,
    description,
    caption: date.toISOString(),
  });
  Object.keys(req.files).forEach(async (file) => {
    var ext = path.extname(req.files[file].name || "");
    await writeFile(
      req.files[file],
      `${req.files[file].md5}${ext}`,
      (resolve, fileName) => {
        models["media"]
          .create({
            path: fileName,
            postId: post.id,
            isVideo: file.includes("video"),
            description: "Auto Create",
          })
          .then(() => {
            resolve();
          });
      }
    );
  });
  models["price"]
    .create({
      sale: parseFloat(price),
      discount: parseFloat(discount),
      postId: post.id,
    })
    .then(() => {
      model
        .findOne({
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          where: { id: post.id },
        })
        .then((data) => {
          res.status(200).send(data);
        });
    });
};

const put = async (req, res) => {
  let brandId = req.body.brandId;

  try {
    if (req.body.brandId_obj) {
      brandId = JSON.parse(req.body.brandId_obj);
    }
  } catch {
    brandId = req.body.brandId;
  }

  let deleteImages;

  try {
    deleteImages = JSON.parse(req.body.deleteImages);
  } catch {}

  const { price = 0, discount = 0, description, id } = req.body;

  let brand = null;

  if (typeof brandId === "object") {
    brand = { id: brandId.id };
  } else {
    brand = await models["brand"].findOne({ where: { caption: brandId } });
    if (!brand) {
      brand = await models["brand"].create({
        caption: brandId,
        description: "Auto Create From Post",
      });
    }
  }

  const date = new Date();
  await model.update(
    {
      brandId: brand.id,
      description,
      caption: date.toISOString(),
    },
    { where: { id: id } }
  );
  if (req.files) {
    Object.keys(req.files).forEach(async (file) => {
      var ext = path.extname(req.files[file].name || "");
      await writeFile(
        req.files[file],
        `${req.files[file].md5}${ext}`,
        (resolve, fileName) => {
          models["media"]
            .create({
              path: fileName,
              postId: id,
              isVideo: file.includes("video"),
              description: "Auto Create",
            })
            .then(() => {
              resolve();
            });
        }
      );
    });
  }

  if (Array.isArray(deleteImages)) {
    await models["media"].destroy({ where: { id: deleteImages } });
  }

  models["price"]
    .update(
      {
        sale: parseFloat(price),
        discount: parseFloat(discount),
      },
      { where: { postId: id } }
    )
    .then(() => {
      model
        .findOne({
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
          where: { id: id },
        })
        .then((data) => {
          res.status(200).send(data);
        });
    });
};

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));
  router.post("/", checkMethod(post, moduleName));
  router.put("/", put);

  defaultHelpRouter(router, model);
  // defaultPutRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};
