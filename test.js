const sql = require('sqlite3').verbose()
const path = require('path');
const userPath = path.resolve(__dirname, 'users.db');
const guildPath = path.resolve(__dirname, 'guilds.db');

let db = new sql.Database(guildPath, sql.OPEN_READWRITE, (err) => {
	if(err){
		console.error(`SQL ERROR: ${err.message}`);
	}
});

let guildArray = [];
let messages = [];



db.each(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`, function(err, guilds){
	console.log(guilds)
});
