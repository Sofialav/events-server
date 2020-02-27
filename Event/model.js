const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  name: { type: Sequelize.STRING, allowNull: false },
  date: Sequelize.STRING,
  description: Sequelize.STRING
});

module.exports = Event;
