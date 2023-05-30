const mysql = require('mysql');

exports.handler = async function (event, context) {
    if(event.httpMethod != "POST") {
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

    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM cf_rhskcowwmy LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
            if (err) {
                console.log(err.message);
            }

            db.end();

            const data = results.map(result => Object.values(result));
            
            resolve({
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        });
    });
}
