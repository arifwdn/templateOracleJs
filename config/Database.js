const oracledb = require("oracledb");
const setting = require("./setting-db");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const query = (q, bind = [], options = {}) => {
  return new Promise(async function (resolve, reject) {
    let connection;
    try {
      connection = await oracledb.getConnection({
        user: setting.user,
        password: setting.password,
        connectString: setting.hostDB,
      });
      const result = await connection.execute(q, bind, options);
      resolve(result);
    } catch (err) {
      reject(err);
    } finally {
      if (connection) {
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
};
const eksekusi = async (q, func = (result) => result) => {
  try {
    result = await query(q.query, q.bind, q.options);
    func(result);
  } catch (err) {
    console.error(err);
  }
};
module.exports = eksekusi;
