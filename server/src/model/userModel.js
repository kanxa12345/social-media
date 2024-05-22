// model.js
const knex = require("knex");
const config = require("../db/connection");

const User = knex(config.development);

// Create the table only if it does not exist
User.schema.hasTable('users').then(exists => {
  if (!exists) {
    return User.schema
      .createTable("users", (table) => {
        table.increments("id");
        table.string("userName").notNullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
      })
      .then(() => {
        console.log("Table created successfully");
      })
      .catch((err) => {
        console.error("Error creating table:", err);
      });
  }
});

module.exports = User;
