module.exports = {
	// API server URL
	apiServer: "http://localhost:8081",
	// set public mode
	// In public mode, users can read public notes without signing in.
	public: true,
	db: {
		host: "localhost",
		port: 5432,
		user: "user",
		pass: "pass",
		name: "test",
		// set TypeORM extra configuration
		extra: { }
	}
};
