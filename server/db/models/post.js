const def = (db, DataTypes, options) => {
  const model = db.define(
    "post",
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );
  model.associate = (models) => {
    model.belongsTo(models.brand, {
      foreignKey: "brandId",
      as: "brand",
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return model;
};

module.exports = def;
