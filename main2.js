var mysql = require("mysql2");
var remote_dbhost = {
    host: "ra1.anystream.eu", // 127.0.0.1 or localhost
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};

let sql2 = "SELECT * FROM `cb12ptjs`.`customer`;";
let connection = mysql.createConnection(remote_dbhost);

// connection.connect(function(err, result, fields) {
//     if(err) {
//         console.log("Error connecting");
//         console.log(err);
//     }
//     else {
//         console.log("Connected!");
//         connection.query(sql2, (err, rows, fields) => {
//             if(err) {
//                 console.log("Error in sql query");
//                 process.exit();
//             }
//             // console.log(rows);
//             rows.forEach(element => {
//                 console.log(element);
//             });
//         });
//         // console.log(result);
//         connection.end();
//     }
// });

let promise = new Promise((resolve, reject) => {
    connection.connect(function (err, result, fields) {
        if (err) {
            // console.log("Error connecting");
            // console.log(err);

            reject("Error connecting");
            // connection.end();
        }
        else {
            let finalRows = [];
            console.log("Connected!");
            
            connection.query(sql2, (err, rows, fields) => {
                if (err) {
                    console.log("Error in sql query");
                    // process.exit();
                    reject("Error in sql query");
                }
                // console.log(rows);
                finalRows = rows;
                resolve(finalRows);
                // rows.forEach(element => {
                //     console.log(element);
                // });
            });
            
            connection.end();
        }
    });

});

promise.then(
    result => console.log(result),
    error => console.log(error)
);