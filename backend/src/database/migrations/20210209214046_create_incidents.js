
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments();
    table.string('tittle');
    table.string('description');
    table.decimal('value');

    // coluna que vai armazenar a ID que vira da outra tabela
    table.string('ong_id').notNullable();

    //criando chave estrangeira
    table.foreign('ong_id').references('id').inTable('ongs')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents')
};
