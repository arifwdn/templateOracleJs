const database = require("./config/Database");
const setting = require("./config/setting-db");

const db = new database(setting.user, setting.password, setting.hostDB);
const data = {
  query: `select * from table`,
};
db.eksekusi(data, (data) => {
  console.log(data);
});
