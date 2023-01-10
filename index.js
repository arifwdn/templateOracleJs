const database = require("./config/Database");
const setting = require("./config/setting-db");

const db = new database(setting.user, setting.password, setting.hostDB);
db.eksekusi(
  { query: "select * from table where id = :id", bind: [{ id: 1 }] },
  (data) => {
    console.log(data.rows);
  }
);
