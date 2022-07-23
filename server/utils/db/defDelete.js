const checkDataByFields = require("./checkData");

const def = (fields, data, model, onGetWhere) => {
  const check = fields ?? ["id"];
  let handleGetWhere = onGetWhere;

  if (typeof onGetWhere !== "function") {
    handleGetWhere = () => ({ id: data.id });
  }

  if (check) {
    const checkData = checkDataByFields(check, data);

    if (checkData.isError) {
      throw new Error(checkData.message);
    }
  }

  return new Promise((resolve, reject) => {
    model
      .destroy({ where: handleGetWhere() })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = def;
