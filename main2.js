var mysql = require("mysql2");
var remote_dbhost = {
    host: "ra1.anystream.eu", // 127.0.0.1 or localhost
    port: "54200",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};

let sql2 = "SELECT * FROM `cb12ptjs`.`customer`;";
let connection = mysql.createConnection(remote_dbhost);



let promise = new Promise((resolve, reject) => {
    connection.connect(function (err, result, fields) {
        if (err) {
            reject(`Error connecting: ${err}`);
        }
        else {
            let finalRows = [];
            console.log("Connected!");
            
            connection.query(sql2, (err, rows, fields) => {
                if (err) {
                    reject("Error in sql query");
                }
                finalRows = rows;
                resolve(finalRows);
            });
            connection.end();
        }
    });
});

promise.then(
    resolved => console.log(resolved),
    rejected => console.log(rejected)
);