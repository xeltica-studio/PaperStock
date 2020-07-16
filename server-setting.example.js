module.exports = {
	// API server URL
	apiServer: "https://api.paperstock.org",
	// set public mode
	// In public mode, users can read public notes without signing in.
	public: false,
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
