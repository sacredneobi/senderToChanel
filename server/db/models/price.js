const def = (db, DataTypes, options) => {
  const model = db.define(
    "price",
    {
      sale: DataTypes.FLOAT,
      discount: DataTypes.FLOAT,
    },
    options
  );
  model.associate = (models) => {
    model.belongsTo(models.post, {
      foreignKey: "postId",
      as: "post",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
    });
  };
  return model;
};

module.exports = def;
