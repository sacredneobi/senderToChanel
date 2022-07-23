const defMenu = [
  { name: "posts", caption: "posts", icon: "signpost" },
  { name: "brands", caption: "brands", icon: "polymer" },
];
const defSettings = [];

const get = (req, res) => {
  res.status(200).send({ route: defMenu, routeSetting: defSettings });
};

module.exports = (router) => {
  router.get("/", get);
};
