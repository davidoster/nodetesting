/*
class DatabasePromise
constructor accepts: 2 parameters
1st: configDetails - connection details
2nd: query - sql query

methods:
initializeConnection():
initializePromise(): 
connectionConnect():



*/
var mysql = require("mysql2");
class DatabasePromise {
    constructor(configDetails, query) {
        this.configDetails = configDetails;
        this.query = query;
        this.resolve = null;
        this.reject = null;
        this.promise = new Promise(resolve, reject);
        initializeConnection();
    }

    initializeConnection() {
        this.connection = mysql.createConnection(configDetails);
        this.connection.connect(this.connectionConnect(error, result, fields));
        
    }

    connectionConnect(error, result, fields) {
        if(error) {
            reject(`Error connecting: ${error}`);
        }
        else {
            let finalRows = [];
            console.log("Connected!");
            
            this.connection.query(sql2, (err, rows, fields) => {
                if (err) {
                    reject("Error in sql query");
                }
                finalRows = rows;
                resolve(finalRows);
            });
            this.connection.end();
        }
    }
}

module.exports = { DatabasePromise }


// this goes to another file that imports require()
let remote_dbhost = {
    host: "ra1.anystream.eu", // 127.0.0.1 or localhost
    port: "54200",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};
let query = "SELECT * FROM `cb12ptjs`.`customer`;";
let myDatabasePromise = new DatabasePromise(remote_dbhost, query);
console.log(myDatabasePromise.results());