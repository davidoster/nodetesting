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

let resolveFunction = function() { return {} };
let rejectFunction  = function() { return {} };
class MyPromise {
    constructor(resolve, reject, instanceOfDBPromise) {
        this.resolve = resolve;
        this.reject = reject;
        this.instanceOfDBPromise = instanceOfDBPromise;
    }
    execute = (value) => {
        let iMyPromise = this;
        let promiseResult = new Promise(function(resolve, reject) {
            value(resolve, reject, iMyPromise.instanceOfDBPromise) // initializeConnection()
        });
        return(promiseResult);
    }
}

let aPromise = new MyPromise(resolveFunction, rejectFunction);



class DatabasePromise {

    constructor(configDetails, query) {
        this.configDetails = configDetails;
        this.query = query;
        this.resolve = this.sqlQuery;
        this.reject = this.error;
        this._connection = null;
    }

    get connection(){
        return(this._connection);
    }

    set connection(connection) {
        this._connection = connection;
        // console.log(this._connection);
    }

    initializeConnection(resolve, reject, instance) {
        instance.connection = mysql.createConnection(instance.configDetails);
        // console.log(`inst/connection: ${instance}`);
        instance.connection.connect(function(error, result, fields) {
            
            if(error) {
                reject(this.error(`Error connecting: ${error}`));
            }
            else {
                let finalRows = [];
                // console.log("Connected!");
                resolve(instance.sqlQuery(instance.connection, instance.query, reject));
                instance.connection.end();
            }
        });
    }

    sqlQuery(connection, query, reject) {
        let result = connection.query(query, (err, rows, fields) => {
            if (err) {
                reject(this.error("Error in sql query"));
            }
            finalRows = rows;
            console.log(finalRows);
        });
        return(result);
    }

    error(value) {
        return(value);
    }

    results() {
        // inside Promise
        // console.log(this);
        this.promise = new MyPromise(this.resolve, this.reject, this);
        return(this.promise.execute(this.initializeConnection));
        // end of Promise
    }
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
let dbPromise = myDatabasePromise.results();
dbPromise.then(resolve => { console.log(resolve); });

