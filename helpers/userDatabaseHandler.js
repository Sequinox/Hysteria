const sql = require('sqlite3').verbose()
const path = require('path');
const dbPath = path.resolve(__dirname, '..', 'users.db');

let currentValue = 0;

module.exports = {
  updateRespects(user){
    let db = new sql.Database(dbPath, sql.OPEN_READWRITE, (err) => {
      if(err){
        console.error(`SQL ERROR: ${err.message}`);
      }
    });
		db.get('SELECT userID FROM users WHERE EXISTS (SELECT userID FROM users WHERE userID = ?)', user, function(err, row) {
			if(typeof row === "undefined"){
				db.run('INSERT INTO users (userID) VALUES (?)', user, function(err){
					if(err){
						console.log(err)
					}
				});
			} else {
				db.get('SELECT RespectsPaid FROM users WHERE userID = ?', user, (err, rows) => {
					currentValue = rows.RespectsPaid
					let data = [currentValue + 1, user]
					console.log(data)
					db.run('UPDATE users SET RespectsPaid = ? WHERE userID = ?', data, function(err){

					});
				});
			}
		});
  }
}
