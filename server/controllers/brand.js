const models = require("../db/models");
const { Op } = require("sequelize");
const { checkMethod } = require("../utils");
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
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      ...other,
      order: [["caption", "ASC"]],
      where: where,
    })
  );
};

module.exports = (router, moduleName) => {
  model = models[moduleName];

  router.get("/", checkMethod(get, moduleName));

  defaultHelpRouter(router, model);
  defaultPutRouter(router, moduleName, model, null);
  defaultPostRouter(router, moduleName, model, null);
  defaultDeleteRouter(router, moduleName, model, null);
};
