const mysql = require('mysql');

exports.handler = async function (event, context) {
    if(event.httpMethod != "POST") {
        return {
            statusCode: 405
        }
    }
    
    const params = JSON.parse(event.body);
    
    /*
    if(process.env.ACCESS_TOKEN != event.headers.authorization) {
        return {
            statusCode: 403
        }
    }*/
    
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
        case "messages":
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM cf_rhskcowwmy LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
                    
                    db.end();
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(results.map(result => Object.values(result)))
                    })
                });
            });
            break;
        case "sessions":
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM security_log LIMIT 10 OFFSET ?', [params.page > 0 ? parseInt(params.page)-1 : 0], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
                    
                    db.end();
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(show(results))
                    })
                });
            });
            break;
        case "purrsloud":
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: "Purrsloud", species: "cat", "photo": "https://learnwebcode.github.io/json-example/images/cat-2.jpg", bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis asperiores, sunt consectetur a amet dolorem rem animi tempore molestias nesciunt fuga, sequi alias voluptatum totam reprehenderit assumenda deleniti distinctio? Cumque. Lorem ipsum." })
            }
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
