const test = () => {};

module.exports = (bot) => {
  bot.newCommand(
    { command: "sky", description: "Товары из категории SKY" },
    test
  );
  bot.newCommand(
    { command: "puff_bar", description: "Товары из категории PUFF bar" },
    test
  );
  bot.newCommand(
    { command: "hqd", description: "Товары из категории HQD" },
    test
  );
  bot.newCommand(
    { command: "izi", description: "Товары из категории IZI" },
    test
  );
  bot.newCommand(
    { command: "masking", description: "Товары из категории MASKING" },
    test
  );
};
