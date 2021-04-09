
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.integer('nivel').notNull()
        table.boolean('toggle').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
