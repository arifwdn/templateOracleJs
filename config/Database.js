const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

class db {
  constructor(user, password, hostDB) {
    this.user = user;
    this.password = password;
    this.host = hostDB;
  }
  connect(usr, pss, hostdb) {
    return oracledb.getConnection({
      user: usr,
      password: pss,
      connectString: hostdb,
    });
  }
  query(query, bind = [], options = {}) {
    return new Promise(async function (resolve, reject) {
      let connection;
      try {
        connection = await this.connect(this.user, this.password, this.hostDB);
        const result = await connection.execute(query, bind, options);
        resolve(result);
      } catch (err) {
        reject(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (e) {
            console.error(e);
          }
        }
      }
    });
  }
  async eksekusi(q = { query, bind, options }, func = (result) => result) {
    try {
      let result = await this.query(q.query, q.bind, q.options);
      func(result);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = db;
