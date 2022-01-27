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
        this._connection = null;
        // this.promise = new Promise(this.resolve, this.reject);
        // this.initializeConnection.bind(this);
        // inside Promise
            this.initializeConnection();
        // end of Promise
        
    }

    get connection(){
        return(this._connection);
    }

    set connection(connection) {
        this._connection = connection;
        console.log(this._connection);
    }

    initializeConnection() {
        this.connection = mysql.createConnection(this.configDetails);
        // console.log(this._connection);
        this.connection.connect(function(error, result, fields) {
            
            if(error) {
                console.log(`Error connecting: ${error}`);
            }
            else {
                let finalRows = [];
                console.log("Connected!");
                
                this.connection.query(this.query, (err, rows, fields) => {
                    if (err) {
                        console.log("Error in sql query");
                    }
                    finalRows = rows;
                    console.log(finalRows);
                });
                this.connection.end();
            }
        });
        
    }

    // connectionConnect(error, result, fields) {
    //     if(error) {
    //         console.log(`Error connecting: ${error}`);
    //     }
    //     else {
    //         let finalRows = [];
    //         console.log("Connected!");
            
    //         this.connection.query(this.query, (err, rows, fields) => {
    //             if (err) {
    //                 console.log("Error in sql query");
    //             }
    //             finalRows = rows;
    //             console.log(finalRows);
    //         });
    //         this.connection.end();
    //     }
    // }
}

module.exports = { DatabasePromise }


// this goes to another file that imports require()
let remote_dbhost = {
    host: "ra1.anystream.eu", // 127.0.0.1 or localhost
    port: "5420",
    user: "cb12ptjs",
    password: "cb12ptjs",
    database: "cb12ptjs"
};
let query = "SELECT * FROM `cb12ptjs`.`customer`;";
let myDatabasePromise = new DatabasePromise(remote_dbhost, query);
// console.log(myDatabasePromise.results());