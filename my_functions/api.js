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
                const items = params.items;
                let lineItems = [];
                items.forEach((item)=> {
                    lineItems.push(
                        {
                            price: item.price,
                            quantity: item.quantity
                        }
                    )
                });
            
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: lineItems,
                    mode: 'payment',
                    success_url: "http://localhost:3000/success?id={CHECKOUT_SESSION_ID}",
                    cancel_url: "http://localhost:3000/cancel",
                    shipping_address_collection: {
                        allowed_countries: [
                          "AU", "AT", "BE", "BR", "CA", "CN", "HR", "CZ", "DK", "EE", "FI", "FR", "DE",
                          "GR", "HK", "HU", "IS", "IE", "IT", "JP", "LV", "LT", "LU", "MO", "MY", "NL",
                          "NZ", "NO", "PL", "PT", "RO", "RS", "SG", "SK", "SI", "KR", "ES", "SE", "CH",
                          "TW", "GB", "US",
                        ]
                    },
                    phone_number_collection: {
                        enabled: true,
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
        case "ye8vw13div":
            return new Promise(async (resolve, reject) => { 
                const info = await stripe.checkout.sessions.retrieve(params.id);
                
                db.query('INSERT INTO or_88guj2io3r (odr) VALUES (?)', [
                    JSON.stringify(info),
                ], function (err, results, fields) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        }
                    })
                });
    
                db.end();
                
                resolve({
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        details: info
                    })
                })
            });
            break;
        case "lru2b15dog":
            return new Promise(async (resolve, reject) => {
                db.query('INSERT INTO sb_rhskcowwmy (email, created_at) VALUES (?, ?)', [
                    params.e,
                    Math.floor(Date.now() / 1000)
                ], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }

                    db.end();
                    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        }
                    })
                });
            });
            break;
        case "re4kvlb13v":
            return new Promise(async (resolve, reject) => {
                db.query('INSERT INTO ts_b4j94kifep (pc, co, rt, au, tr, st, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
                    params.p,
                    params.c,
                    params.r,
                    params.a,
                    params.t,
                    0,
                    Math.floor(Date.now() / 1000)
                ], function (err, results, fields) {
                    if (err) {
                        console.log(err.message);
                    }

                    db.end();
                    
                    resolve({
                        statusCode: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'application/json'
                        }
                    })
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
