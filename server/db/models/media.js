const def = (db, DataTypes, options) => {
  const model = db.define(
    "media",
    {
      path: DataTypes.TEXT,
      description: DataTypes.TEXT,
      isVideo: DataTypes.BOOLEAN,
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
