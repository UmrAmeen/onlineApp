import Database from "better-sqlite3";
const db = new Database("C:\\Users\\TECH VIEW\\products.db");
db.pragma("journal_mode = WAL");

export default db;