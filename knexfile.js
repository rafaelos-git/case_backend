module.exports = {
	client: 'postgresql',
	connection: {
		database: 'mind_case',
		user: 'postgres',
		password: '1234567'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};