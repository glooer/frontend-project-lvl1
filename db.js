import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

class DB {
	static async getDb() {
		return await open({
			filename: './db.db',
			driver: sqlite3.Database
		})
	}

	static getUsers(db) {
		return db.all('select * from users');
	}

	static saveOnlineInfo(db, user, time, is_online) {
		db.run("INSERT INTO online VALUES (?, ?, ?)", user, time, is_online).catch(err => {
			if (err && err.errno === 19) {
				return;
			}

			if (err) {
				db.close();
				throw err;
			}
		});
	}
}

export default DB;
