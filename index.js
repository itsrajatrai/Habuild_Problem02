/*
    The file contains the following functions:
    generateRandomString() - generates a random string of length 14
    generateShortUrl()- generates a short url for the long url entered by the user
    redirect()- redirects the short url to the long url
    updateExpiryDate()- updates the expiry date of the short url to the days entered by the user
    updateLongUrl()- updates the long url of the short url to the long url entered by the user
    deleteExpiredUrl()- deletes the short url from the database if the expiry date is passed automatically

*/


var pg = require('pg');
var pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'habuild',
    table: 'url',
    password: '0000',
    port: 5432,
});

//function to generate random string of length 14 
function generateRandomString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 14; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//generating short url for the long url using the generateRandomString function above with expiry date of 1 day
function generateShortUrl(longUrl, callback) {
    var shortUrl = "www.habuild.in/"+generateRandomString();
    var date = new Date();
   // expiry date is set to 1 day from the current time
    var expiryDate = new Date(date.getTime() + (24 * 60 * 60 * 1000));
    console.log (expiryDate);
    console.log(shortUrl);
    //to check if the short url is already present in the database
    pool.query('SELECT * FROM url WHERE short_url = $1', [shortUrl], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.rows.length > 0) {
            console.log("short url already present");
            generateShortUrl(longUrl, callback);
        } else {
            pool.query('INSERT INTO url (long_url, short_url, expiry_date) VALUES ($1, $2, $3)', [longUrl, shortUrl, expiryDate], function(err, result) {
                if (err) {
                    console.log(err);
                }
                callback(shortUrl);
            });
        }
    });
}

//function to redirect the short url to the long url
function redirect(shortUrl, callback) {
    pool.query('SELECT long_url FROM url WHERE short_url = $1', [shortUrl], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result.rows.length > 0) {
            callback(result.rows[0].long_url);
        } else {
            callback(null);
        }
    });
}   

//function to update the expiry date of the short url to the days entered by the user
function updateExpiryDate(shortUrl, days, callback) {
    var date = new Date();
    var expiryDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
    pool.query('UPDATE url SET expiry_date = $1 WHERE short_url = $2', [expiryDate, shortUrl], function(err, result) {
        if (err) {
            console.log(err);
        }
        callback(result);
    });
}

//funtion to update the long url of the short url to the long url entered by the user
function updateLongUrl(shortUrl, longUrl, callback) {
    pool.query('UPDATE url SET long_url = $1 WHERE short_url = $2', [longUrl, shortUrl], function(err, result) {
        if (err) {
            console.log(err);
        }
        callback(result);
    });
}

// function to delete the short url from the database if the expiry date is passed automatically
function deleteExpiredUrl(callback) {
    var date = new Date();
    pool.query('DELETE FROM url WHERE expiry_date < $1', [date], function(err, result) {
        if (err) {
            console.log(err);
        }
        callback(result);
    });
}
