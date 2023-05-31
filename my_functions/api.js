const mysql = require('mysql');

exports.handler = async function (event, context) {
    if(event.httpMethod == "POST" || event.httpMethod == "OPTIONS") {}
    else {
        return {
            statusCode: 405
        }
    }
    
    const params = JSON.parse(event.body);
    
    if(process.env.ACCESS_TOKEN != event.headers.authorization) {
        return {
            statusCode: 403
        }
    }
    
    const db = mysql.createConnection({
        host: process.env.HOST,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
        ssl: {
            rejectUnauthorized: true,
        },
    });
    db.connect(function (err) {
        if (err) {
            throw err.message
        }
    });

    let path = event.path.split("/").pop();

    switch (path) {
        case "grkighn6d2":
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM cf_rhskcowwmy LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(results.map(result=>Object.values(result)))
                    })
                });
    
                db.end(function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                });
            });
            break;
        case "b83n4xkqla":
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM sl_rhskcowwmy LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(results.map(result=>Object.values(result)))
                    })
                });
    
                db.end(function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                });
            });
            break;
        case "yw2f51wwfu":
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM cu_3d7aicvmk5 LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(results.map(result=>Object.values(result)))
                    })
                });
    
                db.end(function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                });
            });
            break;
        default:
            return {
                statusCode: 404,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: "Not found"
                })
            }
    }
}
