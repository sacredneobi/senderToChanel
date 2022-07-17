const express = require("express");
const fileUpload = require("express-fileupload");

const def = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(async (req, res, next) => {
    next();
  });
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

  return app;
};

module.exports = def;
