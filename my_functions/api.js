const mysql = require('mysql');

exports.handler = async function (event, context) {
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
        case "contact":
            return new Promise((resolve, reject) => {
                let select = 'SELECT * FROM contact_form LIMIT 30';
    
                db.query(select, function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }
    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(results)
                    })
                });
    
                db.end(function (err) {
                    if (err) {
                        return console.log(err.message);
                    }
                });
            });
            break;
        case "barksalot":
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: "Barksalot", species: "dog", "photo": "https://learnwebcode.github.io/json-example/images/dog-1.jpg", bio: "This dog is very communicative. Deleniti, tempora quis commodi qui inventore ratione rem porro doloribus et obcaecati cumque quibusdam voluptatibus iure nisi aut minima consequuntur, officiis esse? Lorem ipsum, dolor sit amet consectetur adipisicing elit." })
            }
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
