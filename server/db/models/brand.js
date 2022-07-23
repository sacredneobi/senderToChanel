const def = (db, DataTypes, options) => {
  const model = db.define(
    "brand",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      ...options,
      // hooks: {
      //   afterBulkDestroy: (record, options) => {
      //     console.log("DELETE", record, options);
      //   },
      //   afterDestroy: (record, options) => {
      //     console.log("DELETE_1", record, options);
      //   },
      // },
    }
  );

  return model;
};

module.exports = def;
