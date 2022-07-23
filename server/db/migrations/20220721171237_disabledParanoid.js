const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(deletedAt) => "brands"
 * removeColumn(deletedAt) => "media"
 * removeColumn(deletedAt) => "posts"
 * removeColumn(deletedAt) => "prices"
 *
 */

const info = {
  revision: 3,
  name: "disabledParanoid",
  created: "2022-07-21T17:12:37.648Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["brands", "deletedAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["media", "deletedAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["posts", "deletedAt", { transaction }],
  },
  {
    fn: "removeColumn",
    params: ["prices", "deletedAt", { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "addColumn",
    params: [
      "brands",
      "deletedAt",
      { type: Sequelize.DATE, field: "deletedAt" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "media",
      "deletedAt",
      { type: Sequelize.DATE, field: "deletedAt" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "posts",
      "deletedAt",
      { type: Sequelize.DATE, field: "deletedAt" },
      { transaction },
    ],
  },
  {
    fn: "addColumn",
    params: [
      "prices",
      "deletedAt",
      { type: Sequelize.DATE, field: "deletedAt" },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
