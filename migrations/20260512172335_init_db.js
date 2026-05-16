/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // users
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email", 255).notNullable().unique();
    table.string("full_name", 255);
    table
      .enum("role", ["owner", "admin", "player"])
      .defaultTo("player");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("email_verified_at").nullable();
  });

  // auth
  await knex.schema.createTable("auth", (table) => {
    table.integer("user_id").unsigned().primary();
    table.string("password_hash", 255).notNullable();
    table.text("token").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  // email_verifications
  await knex.schema.createTable("email_verifications", (table) => {
    table.integer("user_id").unsigned().primary();
    table.string("token", 255).notNullable().unique();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });

  // reset_password
  await knex.schema.createTable("reset_password", (table) => {
    table.integer("user_id").unsigned().primary();
    table.string("token", 255).notNullable().unique();
    table.varchar("expires_at").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists("reset_password");
  await knex.schema.dropTableIfExists("email_verifications");
  await knex.schema.dropTableIfExists("auth");
  await knex.schema.dropTableIfExists("users");
};
