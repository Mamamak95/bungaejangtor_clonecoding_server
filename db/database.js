import mysql from "mysql2";

const pool = mysql.createPool({
  host: "192.168.50.57",
  port: "3306",
  user: "root",
  password: "1234",
  database: "bunjang",
});

export const db= pool.promise()
