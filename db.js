const sqlite3 = require('sqlite3').verbose();
const CONFIG = require('./config');

const createTableEsamiScript = `CREATE TABLE esami 
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text, 
    crediti int, 
    voto int
)`

const db = new sqlite3.Database(CONFIG.DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err;
    } else {
        console.log('Connected to the SQLite database.')
        db.run(createTableEsamiScript,
            (err) => {
                if (err && err.message === 'SQLITE_ERROR: table esami already exists') {
                    console.log('db already created');
                }
            });
    }
});


module.exports = db