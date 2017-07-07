'use strict';
const oracledb = require("oracledb");
module.exports =
    class OraWebTrckModel {

        constructor() {
            oracledb.maxRows = 1000;
            oracledb.createPool({
                    user: "BMZRMRT",
                    password: "BMZRMRT",
                    connectString: "172.18.35.1:1522/orclspc2.zsw.iron"
                },
                (err, pool) => console.log(pool)
            );
        }

        getTrakingData() {
            return new Promise((resolve, reject) => {
               let orapool=oracledb.getPool();
                orapool.getConnection((rerror, connection) => {
                    if (rerror) {
                        console.error(rerror);
                        return;
                    }
                    connection.execute(
                        "SELECT * " +
                        "FROM WEB_TRK_DATA " +
                       // "WHERE status > 0 " +
                        "ORDER BY area, position",
                        (err, result) => {
                            if (err) {
                                console.error(err);
                                reject(err);
                                return;
                            }
                           // console.log(JSON.stringify(result.rows));
                            connection.release((err) => {
                                if (err) console.log('pool err =' + JSON.stringify(err));
                            });
                            resolve(result.rows);
                        });
                });
            });
        }


    }
