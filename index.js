const db = require("./config/Database");

const data = {
  query: `select * from table where id = :uid`,
  bind: { uid: 1 },
  // options for CUD ex. {autocommit: true}
};

db(data, (data) => {
  console.log(data.rows);
});
