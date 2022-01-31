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
class MyPromise {
    constructor(resolve, reject, instanceOfDBPromise) {
        this.resolve = resolve;
        this.reject = reject;
        this.instanceOfDBPromise = instanceOfDBPromise;
    }
    execute = async (value) => {
        let iMyPromise = this;
        let results = null;
        let promiseResult = new Promise(function(resolve, reject) {
            value(resolve, reject, iMyPromise.instanceOfDBPromise); // initializeConnection()
        });
    }
}

class DatabasePromise {

    constructor(configDetails, query) {
        this.configDetails = configDetails;
        this.query = query;
        this.resolve = this.sqlQuery;
        this.reject = this.error;
        this._connection = null;
        this.dbResults = null;
    }

    get connection(){
        return(this._connection);
    }

    set connection(connection) {
        this._connection = connection;
    }

    initializeConnection(resolve, reject, instance) {
        instance.connection = mysql.createConnection(instance.configDetails);
        instance.connection.connect(function(error, result, fields) {
            if(error) {
                reject(instance.error(`Error connecting: ${error}`));
            }
            else {
                instance.dbResults = instance.sqlQuery(instance.connection, instance.query);
                resolve(instance.dbResults);
                return(instance.dbResults);
            }
        });
    }

    sqlQuery(connection, query) {
        let result = connection.query(query, (err, rows, fields) => {
            if (err) {
                return(this.error(`Error in sql query: ${err}`));
            } else {
                console.log(rows);
                connection.end();
                return(rows);
            }
        });
        return(result);
    }

    error(value) {
        return(value);
    }

    results() {
        // inside Promise
        this.promise = new MyPromise(this.resolve, this.reject, this);
        let r = this.promise.execute(this.initializeConnection);
        return(r);
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
myDatabasePromise.results();
