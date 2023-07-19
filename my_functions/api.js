const mysql = require('mysql');
const stripe = require('stripe')(process.env.STP);

exports.handler = async function (event, context) {
    if(event.httpMethod != "POST" && event.httpMethod != "OPTIONS") {
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
        case "uk8f13owie":
            return new Promise(async (resolve, reject) => {
                /*
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
                */
            
                const items = params.items;
                let lineItems = [];
                items.forEach((item)=> {
                    lineItems.push(
                        {
                            price: item.id,
                            quantity: item.quantity
                        }
                    )
                });
            
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: "http://localhost:3000/success",
                    cancel_url: "http://localhost:3000/cancel",
                    shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'DE'], // Set the list of allowed countries for shipping
          }
                });
                
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: session.id,
                        url: session.url
                    })
                })
            
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
